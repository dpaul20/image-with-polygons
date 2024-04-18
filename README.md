# Image with Polygons

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This is a project that allows users to upload an image and overlay polygons on the image. The polygons are defined in a JSON file that is also uploaded by the user.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

To use the application, follow these steps:

1. Cick on the "Upload Image" button and select an image from your device.
2. Click on the "Upload JSON" button and select a JSON file that contains the polygon data. The polygons should be defined as an array of floating point numbers between 0 and 1, where odd-indexed values are the x coordinates and even-indexed values are the y coordinates.
3. The polygons will automatically be drawn on the image.

## Deployment on Railway

This project is deployed on Railway. You can view the live version of the application at [image-with-polygons](https://image-with-polygons-production.up.railway.app.)
