# Study Board Application 📚🔄

A full-featured study dashboard app containing organized notes, simulations, and activities for multiple subjects (Algebra, English Analysis, HSIE, Science), alongside interactive features like a customizable scratchpad, progress tracking, and gamified dopamine booster systems.

---

## 🚀 Deploying to GitHub Pages (And Fixing the "White Screen" Issue)

### ⚠️ Why are you seeing a blank white screen?
By default, when you push code to GitHub, Pages tries to serve the raw repository files as-is. However, **web browsers cannot understand raw TypeScript (`.tsx`) code or Tailwind directives natively**. If GitHub Pages tries to load the raw `index.html` referencing `/src/main.tsx`, it will fail instantly with a console error and display a blank white screen as a result.

To fix this, you must deploy the **compiled production files** (`dist` folder). We have prepared **two extremely simple and foolproof ways** to do this:

---

### 🌟 Method A: Using Automated GitHub Actions (Highly Recommended)
Let GitHub build and compile your app automatically on every push!

1. **Commit and Push your code** to your repository on GitHub.
2. Go to your repository page on GitHub and click the **Settings** tab.
3. On the left sidebar, click on **Pages** (under "Code and automation").
4. Under **Build and deployment** -> **Source**, change the dropdown from *"Deploy from a branch"* to **"GitHub Actions"**.

*That is it! GitHub will automatically trigger the setup, compile the static files securely, and display your live working app within minutes.*

---

### 📦 Method B: Using `npm run deploy` (Terminal Command)
If you prefer traditional branch-based deployment or are having trouble with GitHub Actions:

1. Open your terminal in the project directory.
2. Run this simple command:
   ```bash
   npm run deploy
   ```
3. This command will:
   - Automatically compile and bundle your application into the static `/dist` folder.
   - Automatically create a `gh-pages` branch on GitHub (if it doesn't exist).
   - Push the compiled files to that branch.
4. Go to repository **Settings** -> **Pages**, ensure the **Source** is set to *"Deploy from a branch"*, and select **`gh-pages`** as the branch. Save and you are done!

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
