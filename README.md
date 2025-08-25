# Blog App

📝 Blog App

A modern Blog Application built with Next.js, Tailwind CSS, and shadcn/ui. The app supports authentication & authorization with separate Admin and User roles.

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install node_modules.

```bash
npm install
```

Install Prisma CLI as a development dependency.

```bash
npm install prisma --save-dev
```

Set up a NeonDB PostgreSQL database at Neon and obtain your connection string.

Create a .env file in the project root with the following:

```bash
DATABASE_URL=postgresql://neondb_owner:*********************************************=require
JWT_SECRET=ascu********************************SDF
NODE_ENV=production || development
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=*************
CLOUDINARY_API_KEY=**************
CLOUDINARY_API_SECRET=**********************************
CLOUDINARY_URL=cloudinary://97167********478:***********************************
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=blog-app
```

Set up a Cloudinary account at Cloudinary for image uploads.

Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma db push
```

Start the development server:

```bash
npm run dev

```

## 🚀 Features

- Authentication & Authorization

  - Secure login & register with JWT via custom API routes

  - Role-based access (Admin, User)

- User Features

  - Browse articles

  - Read full blog posts

  - Comment & interact with posts

- Admin Features

  - Create, delete blog posts

  - Manage users

  - Dashboard to track articles & interactions

- UI / UX

  - Built with Tailwind CSS for responsive design

  - shadcn/ui components for modern & accessible UI

  - Dark / Light mode support

## 👤 Author

Built by Ali Ahmed
