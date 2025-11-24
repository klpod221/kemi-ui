<div align="center">
    <h1>Kemi UI: Simple & Lightweight Web Component Library</h1>
    <p>A modern, customizable UI component library built with Lit. Provides a collection of reusable web components with dark theme, TypeScript support, and form validation utilities.</p>
    <img src="https://img.shields.io/npm/v/@klpod221/kemi-ui?style=for-the-badge&color=74c7ec&labelColor=111827" alt="NPM Version">
    <img src="https://img.shields.io/npm/dm/@klpod221/kemi-ui?style=for-the-badge&color=facc15&labelColor=111827" alt="NPM Downloads">
    <img src="https://img.shields.io/github/repo-size/klpod221/kemi-ui?style=for-the-badge&color=a78bfa&labelColor=111827" alt="Repo Size">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=34d399&labelColor=111827" alt="License">
    <img src="https://img.shields.io/github/stars/klpod221/kemi-ui?style=for-the-badge&color=34d399&labelColor=111827" alt="Stars">
    <img src="https://img.shields.io/github/last-commit/klpod221/kemi-ui?style=for-the-badge&color=74c7ec&labelColor=111827" alt="Last Commit">
</div>

## 📝 Description

**Kemi UI** is a simple, lightweight UI component library that I use across my personal applications. Built with Lit for optimal performance and minimal bundle size, it offers a comprehensive set of web components including forms, navigation, overlays, and data display elements—all styled with a modern dark theme and built-in validation utilities.

Perfect for developers who want a straightforward, no-nonsense component library that just works. Whether you're building a quick prototype or a full-scale application, Kemi UI provides the essential building blocks without the complexity of larger frameworks.

## ✨ Features

- 🎨 **Modern Design** - Clean and professional dark theme
- 🚀 **Lightweight** - Built with Lit for minimal bundle size
- 🔧 **Easy to Use** - Simple API with web components
- 📦 **Tree-shakeable** - Import only what you need
- 💪 **TypeScript** - Full TypeScript support
- 🎯 **Form Validation** - Built-in validation utilities

## 🎬 Demo

Check out the live showcase to see all components in action:

**[👉 View Live Demo](https://klpod221.com/kemi-ui)**

## 📦 Installation

### NPM

```bash
npm install @klpod221/kemi-ui
```

### CDN

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@klpod221/kemi-ui/dist/kemi-ui.js"></script>
```

## 🚀 Quick Start

### Import the library

```javascript
import "@klpod221/kemi-ui";
```

### Use components in your HTML

```html
<ui-button variant="primary" size="medium"> Click me! </ui-button>

<ui-input label="Your name" placeholder="Enter your name" required></ui-input>

<ui-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</ui-card>
```

## 📚 Components

Kemi UI includes a comprehensive set of components:

### Form Components

- **Button** - Versatile button with multiple variants
- **Input** - Text input with validation
- **Textarea** - Multi-line text input
- **Checkbox** - Checkbox input
- **Radio** - Radio button input
- **Select** - Dropdown select with search
- **Slider** - Range slider input
- **ColorPicker** - Color selection
- **TagInput** - Multi-tag input
- **Datepicker** - Date selection
- **Form** - Form wrapper with validation

### Display Components

- **Card** - Container card
- **Badge** - Status badge
- **Tag** - Label tag
- **Avatar** - User avatar
- **KeyboardBadge** - Keyboard shortcut display
- **Skeleton** - Loading placeholder
- **Empty** - Empty state
- **Spin** - Loading spinner
- **Table** - Data table with pagination

### Navigation Components

- **Breadcrumb** - Breadcrumb navigation
- **Pagination** - Page navigation
- **Dropdown** - Dropdown menu

### Overlay Components

- **Modal** - Modal dialog
- **Drawer** - Side drawer
- **Popover** - Popover tooltip
- **Message** - Toast notification

## 🔧 Utilities

### Form Validation

Kemi UI provides a powerful validation utility:

```javascript
import { validate, registerRule, setMessage } from "@klpod221/kemi-ui/validators";

// Built-in rules: required, email, min, max, minLength, maxLength, pattern

// Register custom validation rule
registerRule("custom", (value, params) => {
  return value === params.expected;
});

// Set custom error message
setMessage("custom", "Value must match expected value");

// Validate
const errors = validate("test@example.com", [
  { rule: "required" },
  { rule: "email" },
]);
```

## 🎨 Theming

The library uses CSS custom properties for theming. You can customize colors by overriding these variables:

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-bg: #0d0d0d;
  --color-bg-sidebar: #171717;
  --color-bg-block: #1f2937;
  --color-text: #f3f4f6;
  --color-text-secondary: #9ca3af;
  --color-border: #374151;
}
```

## 🔌 Usage with Frameworks

Kemi UI works seamlessly with any framework since it's built with standard web components.

### Vanilla JavaScript

```javascript
import "@klpod221/kemi-ui";

document.querySelector("#app").innerHTML = `
  <ui-button variant="primary">Click me</ui-button>
`;
```

### React

```jsx
import "@klpod221/kemi-ui";

function App() {
  return <ui-button variant="primary">Click me</ui-button>;
}
```

### Vue

```vue
<template>
  <ui-button variant="primary"> Click me </ui-button>
</template>

<script>
import "@klpod221/kemi-ui";

export default {
  name: "App",
};
</script>
```

### Angular

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@klpod221/kemi-ui";

@Component({
  selector: "app-root",
  template: ` <ui-button variant="primary"> Click me </ui-button> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
```

## 💻 Development

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

This will start a showcase application where you can see and interact with all components.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📖 Documentation

Visit the [live showcase](https://klpod221.com/kemi-ui) to see interactive demos of all components with code snippets.

You can also run the showcase locally with `npm run dev`.

## 🏗️ Project Structure

```
kemi-ui/
├── src/
│   ├── components/     # All UI components
│   ├── styles/         # Shared styles and variables
│   ├── utils/          # Utility functions
│   └── index.ts        # Main entry point
├── dist/               # Build output
├── showcase.js         # Showcase application
└── index.html          # Showcase HTML
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Bùi Thanh Xuân (klpod221)**

- Website: [klpod221.com](https://klpod221.com)
- GitHub: [@klpod221](https://github.com/klpod221)
- Email: [klpod221@gmail.com](mailto:klpod221@gmail.com)

## 🤝 Contributing

This is primarily maintained for personal use, but suggestions and improvements are welcome.

## 🔗 Links

- Built with [Lit](https://lit.dev/)
- Bundled with [Vite](https://vitejs.dev/)

---

<div align="center">

### Made with ❤️ by [klpod221](https://github.com/klpod221)

⭐ **Star this repository if you find it helpful!**

</div>
