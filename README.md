# FitAI – Smart Fitness Coach

FitAI is an intelligent fitness application designed to help you achieve your health goals—whether you want to lose weight, gain muscle, or maintain your fitness. The app offers personalized training plans, instructional exercise videos, and features an AI-powered virtual coach that guides and supports you anytime. FitAI supports both dark/light modes and bilingual functionality (Arabic/English) with full RTL/LTR text direction handling.

---

## 🔰 Tech Stack & Tools

![React](https://img.shields.io/badge/React-JS-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Dev%20Server-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styling-blue?logo=tailwindcss)
![Shadcn UI](https://img.shields.io/badge/Shadcn--UI-Components-gray?logo=react)
![React Query](https://img.shields.io/badge/React%20Query-Data%20Fetching-orange)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-blue)
![i18next](https://img.shields.io/badge/i18next-Multi--Language-green?logo=i18next)

---

## 📑 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [FAQ](#faq)

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fitai.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fitai
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

---

## 🚀 Usage

### Start Development Server

```bash
yarn dev
```

### Build for Production

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

---

## 🌟 Features

- 🌗 **Dark/Light Mode Support**

  - Easily toggle between dark and light themes

- 🔤 **Multilingual Support (i18n)**

  - Arabic/English language toggle with RTL/LTR direction handling
  - Persisted locale in `localStorage`

- 🏋️ **Personalized Fitness Plans**

  - Custom workout plans for weight loss or muscle gain

- 🎥 **Exercise Videos**

  - A library of instructional workout videos

- 🤖 **AI Virtual Coach**

  - Smart virtual coach for guidance and motivation

- ✅ **Reusable UI Components**

  - Built with Shadcn UI, Radix, and Tailwind

- 🧠 **Data Handling**
  - Optimized data fetching with `react-query`

---

## 🧱 Folder Structure

```
src/
├── app/
├── assets/
├── components/
├── hooks/
├── pages/
├── lib/
├── routes/
├── styles/
├── App.tsx
├── index.html
└── main.tsx
```

---

## 🙌 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Query](https://tanstack.com/query/latest)
- [i18next](https://www.i18next.com/)
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)

---

## 👥 Contact

Created by **FitAI Team**  
FitAI Project — Fitness Coaching Powered by AI  
🌐 Website coming soon…

---

## ❓ FAQ

**Q: How do I change the default language?**  
A: Update the `lang` key in `localStorage` or call `i18n.changeLanguage('ar' | 'en')`.

**Q: Which Node.js version is required?**  
A: Node.js `>=18.0.0` is recommended.

**Q: Can I use npm instead of yarn?**  
A: Yes, but `yarn.lock` is used by default in this setup.
