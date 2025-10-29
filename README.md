# Blog Platform Frontend

A modern React web application for a blogging platform with LLM-powered topic suggestions. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Authentication System**: JWT-based login and registration
- **Blog Management**: Full CRUD operations for blog posts
- **Paginated Blog Lists**: View all blogs or user-specific blogs with pagination
- **Topic Suggestions**: AI-powered topic suggestions based on keywords
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Protected Routes**: Secure navigation with authentication guards

## Tech Stack

- **React 18+** with TypeScript
- **Vite** for fast development and building
- **React Router v6** for client-side routing
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **Tailwind CSS** for styling
- **Axios** for HTTP requests

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager
- Backend API running on `http://127.0.0.1:8000`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create environment file (optional):
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── blog/            # Blog-specific components
│   ├── common/          # Generic components
│   └── layout/          # Layout components
├── pages/               # Page components
│   ├── auth/            # Login/Register pages
│   ├── blog/            # Blog pages
│   └── suggest/         # Topic suggestion page
├── services/            # API service functions
├── context/             # React Context providers
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## API Integration

The application integrates with the following backend endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

### Blogs
- `GET /blogs` - Get all blogs (paginated)
- `GET /blogs/my` - Get user's blogs (paginated)
- `GET /blogs/:id` - Get single blog
- `POST /blogs/blog` - Create new blog
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

### Topic Suggestions
- `POST /suggest_topics` - Get AI-powered topic suggestions

## Features Overview

### Authentication
- Secure JWT token handling
- Automatic token refresh
- Protected route implementation
- User session management

### Blog Management
- Create, read, update, delete blog posts
- Rich text editing with textarea
- Blog preview and full view
- User-specific blog management

### Topic Suggestions
- Keyword-based topic generation
- AI-powered content suggestions
- One-click prefill to blog creation
- Interactive suggestion cards

### UI/UX
- Responsive design for all screen sizes
- Loading states and error handling
- Clean, modern interface
- Accessible components

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_APP_NAME=Blog Platform
VITE_ENVIRONMENT=development
```

## Deployment

### Build for Production

```bash
yarn build
```

The built files will be in the `dist` directory.

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Build the project
2. Upload the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.