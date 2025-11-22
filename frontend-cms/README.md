# Restaurant CMS

ระบบจัดการร้านอาหาร (Restaurant Management CMS)

## Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Management**: React Hook Form + Zod
- **Routing**: React Router v6
- **HTTP Client**: Axios

## Features

- 🔐 **Authentication System** - Login with role-based access control
- 👥 **User Management** - Manage users with different roles (Admin, Manager, Staff)
- 🍽️ **Menu Management** - CRUD operations for menu items
- 📁 **Category Management** - Organize menu items by categories
- 🪑 **Table Management** - Track table status and availability
- 🛒 **Order Management** - Create and track orders
- 🔒 **Permission System** - Granular permission control for different features

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/            # Static assets
├── components/        # Reusable UI components
│   └── ui/           # shadcn/ui components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── services/         # API services
├── context/          # React Context providers
├── types/            # TypeScript type definitions
├── layouts/          # Layout components
├── routes/           # Routing configuration
├── config/           # Configuration files
├── lib/              # Utility libraries
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

## Default Credentials

For development/testing purposes:

- **Email**: admin@restaurant.com
- **Password**: password123

## Color Palette

The application uses a blue color scheme:

- Primary: #0077b6
- Variants: #0096c7, #00b4d8, #48cae4, #90e0ef, #ade8f4, #caf0f8

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## License

MIT
