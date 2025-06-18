# Summer Scents - Perfume E-commerce Website

A modern, summer-themed e-commerce website for perfumes built with Node.js, Express, and EJS.

## Features

- Responsive, modern design with a summer theme
- Product browsing with search and filter functionality
- Shopping cart functionality
- Product details pages
- Mobile-friendly interface

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd summer-scents
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
summer-scents/
├── data/
│   └── products.json     # Mock product data
├── public/
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   └── images/          # Product images
├── views/
│   ├── layout.ejs       # Main layout template
│   ├── home.ejs         # Home page
│   ├── products.ejs     # Product listing page
│   ├── product-detail.ejs # Product detail page
│   └── cart.ejs         # Shopping cart page
├── server.js            # Express server and routes
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## Development

- The server runs in development mode using nodemon, which automatically restarts when files change
- Edit the CSS in `public/css/style.css` to modify the design
- Add product images to `public/images/` directory
- Modify product data in `data/products.json`

## Features to Add

- User authentication
- Persistent storage with a database
- Checkout process
- Order history
- Admin panel
- Product reviews and ratings

## License

MIT 