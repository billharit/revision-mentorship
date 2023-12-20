# Revision-Style Mentorship Template

Built as a template for mentoring

## Getting Started

1. Fork this repository
2. Clone your forked repository
3. Run `yarn`
4. Duplicate `.env.example` and rename it to `.env`
5. Run `npx prisma migrate reset`, then press `y` to reset database
6. Run `yarn dev`
7. You can also run `npx prisma studio` to view the database

## Brief

Create a product site based on the API provided in `/api-tester`

You may use any external libraries that you've ever used before.

Design is not important, but it should be functional.

### Products Listing Page

1. Display a list of products from the API `/products`
2. The list should show the product title, description, and price.
3. For each product, create 3 buttons for `View`, `Edit`, `Delete`

### Product Details Page

1. Display the product title, description, and price.
2. Create a button for `Edit` and `Delete`

### Product Create Page

1. Display a form with the product title, description, and price.
2. Allow the user to create a product using the provided API.

### Product Edit Page

1. Display a form with the product title, description, and price.
2. The form should be pre-populated with the product data.
3. Allow the user to edit the product using the provided API.

![App Excalidraw](public/diagram/app.png)
