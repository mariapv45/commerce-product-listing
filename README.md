# Commerce Product Listing

Simple commerce page display with filter and search. Built using React, TypeScript and TailwindCSS.

## Features

- 🛍️ Product grid display with responsive design
- 🔍 Real-time search functionality with debounced input
- 🏷️ Filter products by type (Beer, Wine, Spirits)
- 💰 Filter by sale items
- 📱 Mobile-responsive layout
- ⚡ Loading states and error handling
- ✅ Test coverage using Vitest and React Testing Library

## Notes

### Data Fetching

Product data is served from the `public/data/products.json` file to simulate real API behavior. This approach:

- Mimics actual HTTP requests using `fetch()`
- Allows for realistic loading states and error handling
- Provides a development environment that closely resembles production data fetching

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd commerce-product-listing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Testing

- `npm test` - Run tests in watch mode

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
