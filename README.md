# Toheed Education API

A lightweight RESTful API built with Express.js to serve educational data, including Qaidas (Arabic, Urdu, English, Hindi) and Islamic Grammar courses (Aasan Nahu and Aasan Sarf).

## 🚀 Features

- **Multi-language Qaidas**: Arabic, English, Hindi, Urdu.
- **Islamic Grammar Resources**: Aasan Nahu, Aasan Sarf.
- **Search & Pagination**: In-built query options for datasets (`?search=`, `?page=`, `?limit=`).
- **Secure & Fast**: Optimized with CORS and Helmet middleware.

## 📂 Project Structure

```text
toheed-education-api/
│
├── data/
│   ├── aasan_nahu.json
│   ├── aasan_sarf.json
│   ├── arabic_qaida.json
│   ├── english_qaida.json
│   ├── hindi_qaida.json
│   └── urdu_qaida.json
│
├── routes/
│   └── education.routes.js
│
├── meta.json
├── package.json
├── README.md
└── server.js