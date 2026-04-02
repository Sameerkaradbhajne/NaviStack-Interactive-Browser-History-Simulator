<div align="center">
  <img src="./logo.png" alt="Browser History Simulator Logo" width="120" style="border-radius: 16px;"/>
  <h1>NaviStack - Browser History Simulator</h1>
  <p><i>A visually stunning, interactive web application demonstrating Stack Data Structures in a real-world scenario.</i></p>

  ## 🌐 Live Access

  To view the NaviStack System online:
  ### 🔗 **[Click Here for the Live Website Demonstration](https://navi-stack-interactive-browser-hist.vercel.app/)**

  <p>
    <a href="#key-features">Key Features</a> •
    <a href="#how-it-works">How It Works</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation-guide">Installation Guide</a>
  </p>

  ---
  
  <p>
    <a href="https://github.com/Sameerkaradbhajne/NaviStack-Interactive-Browser-History-Simulator">
      <img src="https://img.shields.io/badge/🔴_Live_Demo-Click_Here-FF4B4B?style=for-the-badge&logo=" alt="Live Demo"/>
    </a>
  </p>

</div>

---

## 🌟 Overview

**NaviStack** is a premium, minimal, and highly interactive browser history simulator. Designed to feel like a modern administrative dashboard, this application perfectly visualizes how web browsers handle navigation using Data Structures—specifically, the **Back Stack** and **Forward Stack**.

Whether you're a Computer Science student learning about Stacks (LIFO - Last In, First Out) or a developer looking for a clean UI template, NaviStack provides an immersive way to understand state management.

---

## ✨ Key Features

*   **🖥️ Core Stack Navigation**: Flawlessly simulates pushing to the Back Stack when visiting new pages, and popping to/from the Forward stack upon navigating.
*   **🎨 Premium UI/UX**: Crafted with a card-based layout featuring soft drop shadows, sleek typography (Inter), rounded corners, and smooth CSS transitions.
*   **🌓 Dynamic Dark Mode**: Built-in toggle to switch between a crisp light theme and a deep, eye-friendly dark aesthetic.
*   **⚡ Smooth Animations**: Visual feedback is paramount. Rows slide in elegantly, and toast notifications pop up gracefully to confirm operations.
*   **⌨️ Keyboard Shortcuts**: Power users can navigate instantly using `Alt + Left Arrow` for Back and `Alt + Right Arrow` for Forward.
*   **🔔 Toast Notifications**: Contextual alerts keep you informed of every state change (e.g., "Navigated Back", "URL Visited").

---

## ⚙️ How It Works (The Logic)

Browser navigation relies heavily on two Stacks. Here is the operational workflow visualised in the app:

1.  **Visit New Page**: 
    *   Pushes the current viewing page into the `Back Stack`. 
    *   Clears the `Forward Stack` completely.
    *   Sets the newly visited URL as the **Current Page**.
2.  **Go Back**: 
    *   Pops the top element from the `Back Stack`.
    *   Pushes the **Current Page** into the `Forward Stack`.
    *   Displays the popped element.
3.  **Go Forward**: 
    *   Pops the top element from the `Forward Stack`.
    *   Pushes the **Current Page** into the `Back Stack`.
    *   Displays the popped element.

---

## 🛠️ Tech Stack

This project was built deliberately with zero heavy frameworks to keep the code lightweight, exceptionally fast, and explicitly clear for learning purposes.

*   **HTML5**: Semantic, accessible markup.
*   **Vanilla CSS3**: Modern styling utilizing CSS Variables (Custom Properties) for instantaneous theme switching, Flexbox, and CSS Grid.
*   **Vanilla JavaScript (ES6+)**: Core logic simulating Stacks via arrays, manipulating the DOM dynamically without any external libraries.

---

## 🚀 Installation Guide

Getting the project up and running locally is incredibly simple. No package managers (npm/yarn) are necessary.

### Prerequisites
* A modern web browser (Chrome, Firefox, Safari, Edge).

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/browser-history-simulator.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd browser-history-simulator
   ```
3. **Run the App:**
   Simply open the `index.html` file in your preferred web browser. 
   
   *Optional: If you prefer using a local server, you can run:*
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000 in your browser
   ```

---

<div align="center">
  <p>Designed and built with ❤️</p>
</div>
