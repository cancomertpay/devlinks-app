# 🌐 Devlinks App

I have developed a fullstack application named **Devlinks** using **Next.js**, **Firebase**, and **TailwindCSS**. The application is fully functional and has passed all tests successfully.

## ✨ Features
- **Fully Responsive Design** 📱: Ensures optimal viewing experience across all devices.
- **Animated Landing Page** 🎬: An introduction to the product built with Framer Motion, honouring `prefers-reduced-motion`.
- **User Authentication & Profile Management** 🔐: Supports user login, registration, and profile information storage.
- **Realtime Database Integration** ⚡: Enables instant communication and securely stores all changes in the database.
- **Optimized SSR and CSR** 🚀: Implements Server-Side Rendering (SSR) and Client-Side Rendering (CSR) for the best performance.
- **Enhanced User Interaction** 🎨: Incorporates design initiatives to improve user engagement where necessary.

## 🛠 Built with
- [Next.js 14](https://nextjs.org/) (App Router)
- [Firebase](https://firebase.google.com/) — Authentication and Realtime Database
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [dnd kit](https://dndkit.com/) for drag-and-drop ordering
- [Zod](https://zod.dev/) for form validation

## 📄 Project Description
Users can create their profiles, add and remove links, and rearrange them using a drag-and-drop feature. They can also personalize their profile by adding their name, surname, profile picture, and email address. 

Once all changes are made, users can click the "Preview" button at the top right corner to see their modifications live via a unique URL. On the preview page, users can click the "Share Link" button at the top right to share their personalized link with the world permanently.

## 🖼 A note on profile pictures
Profile pictures are **not** stored in Cloud Storage. Firebase moved Cloud Storage off the free Spark plan, which locked the project's bucket and broke every upload. Instead, the browser downscales the picture to 256px and stores it as a JPEG data URL alongside the rest of the profile in the Realtime Database — a 1MB image comes out at roughly 22KB. That keeps the app free to run and removes a whole failure mode, at the cost of the picture living inside the profile record.

## 🚀 Running it locally

```bash
git clone https://github.com/cancomertpay/devlinks-app.git
cd devlinks-app
npm install
```

Create a `.env.local` file with your own Firebase web config:

```
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_DB_URL=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDER_ID=
NEXT_PUBLIC_APP_ID=
```

Then start the dev server:

```bash
npm run dev
```

The Firebase project needs Email/Password authentication and a Realtime Database. Cloud Storage is not required.

## 🎥 Preview
![App Preview](https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/thypgk1nmxm4modj1wdl.jpg)

## 🌍 Live Link
Check out the live app [here](https://devlinksapp.vercel.app/)

## 📧 Contact
Can Cömertpay - @cancomertpay - cancomertpay@gmail.com
