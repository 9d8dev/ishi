# Ishi

A modern web application starter built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Next.js 15 App Router**: Leveraging the latest Next.js features with App Router architecture
- **React 19**: Using the latest React version with improved performance and features
- **Authentication**: Complete sign-in/sign-up flows with form validation
- **Database Integration**: Drizzle ORM with NeonDB serverless Postgres
- **Admin Dashboard**: Secure admin panel with role-based access control
- **Modern UI Components**: Shadcn UI and Craft Design System built on Tailwind CSS
- **Type Safety**: End-to-end TypeScript with Zod validation
- **Analytics**: Built-in Vercel Analytics for monitoring performance
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: Sonner for beautiful toast notifications
- **Icons**: Lucide React icons library

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM

### Installation

1. Clone the repository:

```bash
git clone https://github.com/9d8dev/ishi.git
cd ishi
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your database credentials and other required variables.

5. Run the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/app                   # Next.js App Router pages
  /(admin)             # Admin dashboard routes
  /(app)               # Main application routes
  /(auth)              # Authentication routes
  /(home)              # Public landing pages
/components            # React components
  /auth                # Authentication components
  /site                # Site layout components
  /ui                  # UI components
/lib                   # Utility functions and shared code
  /auth                # Authentication utilities
  /data                # Data fetching and validation
  /db                  # Database models and configuration
/public                # Static assets
```

## Authentication

Ishi includes a complete authentication system with:

- Sign-in and sign-up forms
- Form validation with Zod
- Protected routes via middleware
- Role-based access control

## Database

The starter uses Drizzle ORM with NeonDB (serverless Postgres) for database operations. Database models are defined in `/lib/db/schema.ts`.

## UI Components

Ishi includes a comprehensive set of UI components from Shadcn UI, built on Radix UI primitives and styled with Tailwind CSS.

## Deployment

This project is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel and deploy.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Created by [9d8](https://9d8.dev)
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Design system from [brijr/craft](https://craft-ds.com/)
- Icons from [Lucide](https://lucide.dev/)
- Database from [NeonDB](https://neon.tech/)
- Authentication from [better-auth](https://github.com/9d8dev/better-auth)
- Form handling from [react-hook-form](https://react-hook-form.com/)
- Validation from [zod](https://zod.dev/)
- Styling from [Tailwind CSS](https://tailwindcss.com/)
- Analytics from [vercel/analytics](https://vercel.com/analytics)
- Toast notifications from [sonner](https://sonner.dev/)
