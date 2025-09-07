# Frontend Authentication App

A modern authentication starter built with **React, TanStack Router, React Query, Zustand, and Zod**.  
This project demonstrates a complete authentication flow with clean code, good structure, and proper state management.

---

##  Features

- **Sign Up / Sign In**
  - Form validation with [Zod](https://zod.dev)
  - Strong password rules (uppercase, number, special character)
  - Confirm password matching
  - Inline error messages + toast notifications
  - Loading spinners on submit

- **Email Verification**
  - Handles verification tokens via query params
  - Shows loading, success, or error states

- **Protected Routes**
  - Redirect unauthenticated users to Sign In
  - Redirect authenticated users away from Sign In / Sign Up
  - Guard routes with TanStack Router `beforeLoad`

- **State Management**
  - Auth state persisted with [Zustand](https://zustand-demo.pmnd.rs)
  - Includes `user`, `token`, `loading`, `error` state
  - Auto logout on `401` responses (Axios interceptor)

- **UI / UX**
  - Modern responsive design with [TailwindCSS](https://tailwindcss.com)
  - Light/Dark mode toggle
  - Social login buttons (Google/Facebook placeholders)
  - Dashboard with welcome message
  - Toast notifications with [Sonner](https://sonner.emilkowal.ski)

- **Bonus**
  - Forgot/Reset password flow placeholder (coming soon)

---

##  Tech Stack

- [React](https://react.dev) (TypeScript)
- [TanStack Router](https://tanstack.com/router)
- [React Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs) (persist middleware)
- [Zod](https://zod.dev) (form validation)
- [React Hook Form](https://react-hook-form.com)
- [Axios](https://axios-http.com)
- [TailwindCSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Sonner](https://sonner.emilkowal.ski)

---

## 📂 Project Structure

src/
 ├─ components/
 │   ├─ ui
 │   ├─ schema.tsx
 │   ├─ ThemeToggle.tsx
 │   └─ passwordinput.tsx
 |
 ├─ features/
 |   |-API setup 
 |   |-React Query provider
 |
 |
 ├─ lib/
 │   ├─ mutation.ts
 │   └─ utils.ts
 │
 ├─ stores/
 │   └─ authstore.ts
 │
 ├─ routes/
 │   ├─ index.tsx             // homepage
 │   ├─ Auth/
 │   │   ├─ signin.tsx
 │   │   ├─ signup.tsx
 │   │   └─ email.tsx
 │   └─ app/
 │       ├─ index.tsx         // Protected wrapper
 │       └─ dashboard.tsx     // 
 │
 └─ main.tsx
