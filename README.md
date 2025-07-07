# RemoteDEV – Connect. Code. Grow—remotely

RemoteDEV is a modern web application for searching remote developer jobs, featuring instant search, sorting, bookmarks, and a smooth user experience.

---

## 🚀 Demo

👉 **Live Demo:** [RemoteDEV on GitHub Pages](https://viacheslav-saprykin.github.io/vite-remotedev)

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** (fast dev/build)
- **@tanstack/react-query** (data fetching, caching)
- **react-hot-toast** (notifications)
- **CSS** (modern, responsive)
- **FontAwesome** (icons)

---

## 📦 Project Structure

```
vite_devRemote/
  ├── public/
  ├── src/
  │   ├── components/      # UI components (JobList, JobItemContent, Spinner, Sidebar, Header, Footer, etc.)
  │   ├── contexts/        # React Context Providers (JobItems, Bookmarks, SearchText, ActiveId)
  │   ├── lib/             # Hooks, types, constants, utilities
  │   ├── index.css        # Main CSS
  │   └── main.tsx         # Entry point
  ├── index.html
  ├── package.json
  └── README.md
```

---

## ⚡️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   ```
3. **Open in your browser:**
   ```
   http://localhost:5173
   ```

---

## 🚀 Deploying to GitHub Pages

1. **Set the base path in `vite.config.ts`:**
   ```ts
   export default defineConfig({
     // ...
     base: '/remote-dev/', 
   });
   ```
2. **Add homepage to `package.json`:**
   ```json
   "homepage": "https://viacheslav-saprykin.github.io/vite-remotedev/"
   ```
3. **Add deploy scripts to `package.json`:**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. **Deploy:**
   ```bash
   npm run deploy
   ```
5. **Update the Demo link above with your deployed URL!**

---

## 🧪 Manual Test Cases

- [ ] On first load: right panel shows a hint, left panel is empty.
- [ ] Search: shows spinner while loading, then results or “No jobs found”.
- [ ] Selecting a job: right panel displays details, spinner only during loading.
- [ ] Bookmarks: can add/remove jobs, persists after reload.
- [ ] API errors: toast notification appears.
- [ ] Pagination and sorting work as expected.

---

## 💡 Suggestions for Improvement

- Add dark mode (theme switcher)
- Add unit tests (Jest + React Testing Library)
- Add skeleton loading for job details
- Add SSR/SSG (e.g., Next.js) for SEO
- Add filters (job type, salary, etc.)

---

## 📄 License

MIT

---

**RemoteDEV — your gateway to remote developer opportunities!**
