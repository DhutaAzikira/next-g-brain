# Next.js Project Documentation

This project is built with [Next.js](https://nextjs.org) and bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 📁 Folder Structure

The project is organized as follows:

```
.
├── app/                # Main application pages and layouts
│   ├── page.tsx        # Root page component
│   └── ...             # Other pages/components
├── components/         # Reusable React components
├── public/             # Static assets (images, favicon, etc.)
├── styles/             # Global and modular CSS/SCSS files
├── utils/              # Utility functions and helpers
├── node_modules/       # Project dependencies
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

### Folder Explanation

- **app/**: Contains main pages, layouts, and application routing.
- **components/**: Reusable React components used throughout the app.
- **public/**: Static assets such as images, favicon, etc.
- **styles/**: Global and modular CSS/SCSS files.
- **utils/**: Utility functions and helpers supporting application logic.
- **node_modules/**: Project dependencies.
- **package.json**: Project metadata and scripts.
- **README.md**: Project documentation.

---

## 📄 Naming Conventions

### Folders & Files

- Use **lowercase** and **kebab-case** (e.g., `my-component`) for general folder and file names.
- For React component files, use **PascalCase** (e.g., `Button.tsx`).
- Folder names should be descriptive and concise.
- Avoid special characters and spaces.
- Group related files (e.g., component, style, and test) within the same folder.
- Use `index.ts` or `index.tsx` as the folder entry point if needed.

### Functions

- Use **camelCase** for function names (e.g., `getUserData`).
- Function names should be clear and descriptive.
- Avoid ambiguous or overly generic names.

---

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

Edit the main page in `app/page.tsx`. Changes will be automatically updated.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for font optimization and loading [Geist](https://vercel.com/font).

---

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Interactive Tutorial](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

---

## ☁️ Deploy to Vercel

Easily deploy your Next.js app using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

