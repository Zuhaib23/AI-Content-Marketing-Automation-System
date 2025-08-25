# 📖 AI Content Marketing Automation System

A **Google Sheets Sidebar Add-on** that automatically generates blog content and images using **OpenAI GPT API** and **Unsplash API**.
It provides a **dark mode UI**, smooth design, and integration with your Google Sheet for easy blog generation.

---

## 🚀 Features

* ✍️ **Generate Blog Content** using OpenAI API
* 🖼️ **Fetch Free Images** from Unsplash API
* 🌙 **Dark Mode UI** with custom scrollbar
* 📊 **Direct Integration with Google Sheets**
* ⚡ **Fully Automated Workflow**

---

## 📂 Project Structure

```
📦 AI Content Marketing Automation System
 ┣ 📜 AIContentAutomation.gs         # Backend Google Apps Script
 ┣ 📜 FormUI.html     # Sidebar UI (Dark Mode)
 ┣ 📜 README.md       # Documentation
```

---

## 🔑 Setup Instructions

### 1. Create a Google Apps Script Project

1. Open your **Google Sheet**
2. Click: `Extensions → Apps Script`
3. Create two files:

   * ` AIContentAutomation.gs` → backend logic
   * `FormUI.html` → sidebar UI

---

### 2. Add Your API Keys

Replace placeholders inside `AIContentAutomation.gs`:

```js
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";
const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY";
```

* Get OpenAI API Key → [https://platform.openai.com](https://platform.openai.com)
* Get Unsplash API Key → [https://unsplash.com/developers](https://unsplash.com/developers)

---

### 3. Run the Script

* Open Google Sheets → `Extensions → Macros → showFormUI`
* A **sidebar** will appear with the blog generator form.

---

## 🖥️ Screenshots

### 🌙 Dark Mode UI

<img width="300" height="401" alt="image 1" src="https://github.com/user-attachments/assets/d7e55390-8a2a-4f3a-97b8-f7792cef04b9" />

<img width="300" height="401" alt="image 2" src="https://github.com/user-attachments/assets/fe2127ea-cc76-4e76-9f27-f32c21bf7b53" />



---

## 🛠️ Tech Stack

* **Google Apps Script** (Backend)
* **HTML, CSS, JS** (Frontend Sidebar UI)
* **OpenAI GPT API** (Blog Generation)
* **Unsplash API** (Free Images)

---

## 🤝 Contributing

Pull requests are welcome!
If you’d like to improve UI or add more features (like multiple image fetch, auto-save blogs), feel free to contribute.

---

## 📜 License

MIT License © 2025

---

⚡ Built with ❤️ using **Google Apps Script + AI**


