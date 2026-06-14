# Study Board Application 📚🔄

A full-featured study dashboard app containing organized notes, simulations, and activities for multiple subjects (Algebra, English Analysis, HSIE, Science), alongside interactive features like a customizable scratchpad, progress tracking, and gamified dopamine booster systems.

---

## 🚀 Deploying to GitHub Pages (Automated!)

A raw Vite + TypeScript codebase **does not work** by simply hosting the files directly in GitHub Pages, because browsers cannot run raw TypeScript (`.tsx`) code or read custom Tailwind directives natively. The files must be compiled into optimized static HTML, CSS, and JS first.

To make this completely hands-free for you, we have added an **automated GitHub Actions deployment workflow**!

### 🔧 2-Step Activation Guide:

1. **Push your code to GitHub**: Put this codebase into a new repository on your GitHub account.
2. **Enable GitHub Actions for Pages**:
   - Go to your repository page on GitHub.
   - Click on the **Settings** tab.
   - On the left sidebar, click on **Pages** under the "Code and automation" section.
   - Under **Build and deployment** -> **Source**, change the dropdown selection from *"Deploy from a branch"* to **"GitHub Actions"**.

That's it! GitHub will now automatically run the build pipeline (`.github/workflows/deploy.yml`) on every push and host your fully working, compiled application securely.

---

## 💻 Running the Project Locally

If you'd like to test, explore, or run the application locally on your computer:

### 1. Install Node.js
Ensure you have [Node.js](https://nodejs.org/) installed (Node 18 or newer recommended).

### 2. Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### 3. Run Development Server
To launch the interactive real-time development environment, run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application!

### 4. Compiling a Local Production Build
To test the output build of the app locally, bundle the static files using:
```bash
npm run build
```
This output is written to the `/dist` folder as a fully optimized, standalone, self-contained single-page bundle.
