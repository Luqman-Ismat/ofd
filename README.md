# OPERATION CONTROL: QFD Report
**Visual Analysis of Amazon Echo Dot**

A high-performance, interactive engineering report built with vanilla HTML, CSS, and JavaScript.

## 🚀 Deployment (Vercel)

This project is optimized for direct deployment to Vercel.

1.  **Push to GitHub**: ensuring this directory is the root of your repository.
2.  **Import to Vercel**:
    *   Go to [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your GitHub repository.
3.  **Configure**:
    *   **Framework Preset**: Select "Other" (or leave as is, Vercel auto-detects static HTML).
    *   **Root Directory**: `./` (default).
    *   **Build Command**: (Leave Empty).
    *   **Output Directory**: (Leave Empty).
4.  **Deploy**: Click **Deploy**.

## 🛠️ Local Development

To run this project locally:

1.  Clone the repository.
2.  Open `index.html` in your browser.
3.  *Optional*: Use a live server (e.g., VS Code Live Server extension) for hot reloading.

## 📂 Project Structure

*   `index.html`: Main entry point.
*   `style.css`: All visual styling (Pitch Black theme).
*   `app.js`: Logic for animations, charts, and the House of Quality matrix.

## ✨ Key Features

*   **House of Quality (HoQ)**: Fully interactive SVG-based correlation matrix.
*   **Scroll Animations**: IntersectionObserver-based reveal effects.
*   **Responsive Design**: Adapts to different screen sizes (optimized for desktop viewing).
