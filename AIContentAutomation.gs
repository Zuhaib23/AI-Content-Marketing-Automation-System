const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // replace with your OpenAI API key
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // replace with your Unsplash API key

function onOpen() {
  SpreadsheetApp.getUi().createMenu('✍️ AI Tools')
    .addItem('Open Generator', 'showFormUI')
    .addToUi();
}

function showFormUI() {
  const html = HtmlService.createHtmlOutputFromFile('FormUI')
    .setTitle('🤖 AI Assistant')
    .setWidth(400);
  SpreadsheetApp.getUi().showSidebar(html);
}

function handleFormInput(keyword) {
  const prompt = `Generate an SEO-optimized blog post about: "${keyword}". 
Return in the following format (each in a new line separated by ###):
1. Blog Title
2. Slug
3. Introduction
4. Paragraph 1
5. Paragraph 2
6. Paragraph 3
7. Paragraph 4
8. Paragraph 5
9. Conclusion
10. FB Caption
11. Insta Caption
12. Hashtags
13. Twitter Post`;

  const resultText = callOpenAIWithRetry(prompt);
  if (!resultText) {
    return { error: '⚠️ Failed to get response from OpenAI API after retry. Please try again later.' };
  }

  const parts = resultText.split('###').map(s => s.trim());

  if (parts.length < 13) {
    return { error: '⚠️ Incomplete blog content received from AI. Please try again with a different keyword.' };
  }

  const slug = parts[1].toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  const imageUrl = getUnsplashImage(keyword) || 'https://via.placeholder.com/800x400?text=No+Image+Available';

  const allContent = [...parts.slice(0, 13), imageUrl];

  // Save to Sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(2, 1).setValue(keyword);
  sheet.getRange(2, 2, 1, allContent.length).setValues([allContent]);

  return { data: allContent };
}

function callOpenAIWithRetry(prompt, retryCount = 1) {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1024
    }),
    muteHttpExceptions: true
  };

  for (let i = 0; i <= retryCount; i++) {
    try {
      const response = UrlFetchApp.fetch('https://api.openai.com/v1/completions', options);
      const result = JSON.parse(response.getContentText());
      const text = result.choices?.[0]?.text?.trim();
      if (text) return text;
    } catch (e) {
      Utilities.sleep(2000); // wait 2 seconds before retry
    }
  }

  return null;
}

function getUnsplashImage(keyword) {
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(keyword)}&client_id=${UNSPLASH_ACCESS_KEY}`;

  try {
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    return data?.urls?.regular || '';
  } catch (e) {
    return '';
  }
}
