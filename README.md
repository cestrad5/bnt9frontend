![Landing page capture](../frontend/src/assets/Screenshot3.png)

# Bonetto Sales Tool Frontend v3.1
This is the frontend for the Bonetto Sales Tool application built with React and Redux.

## Table of Contents

- [Overview]( #📚-overview)
- [Technologies Used](#🛠-technologies-used)
- [Features](#🎁-features)
- [Installation](#💻-installation)
- [Usage](#🖥️-usage)
- [Contributing](#🤝-contributing)
- [License](#📜-license)


## 📚 Overview

The Bonetto Sales Tool is an application to help Bonetto sales representatives easily browse products, create orders for customers, and manage their sales. The production departments can use the application to view orders for customers and compare it with inventory in order to determine if a product is in stock or it needs to be manufactured.

This frontend allows reps to:

- Browse products by category
- View product details
- Add products to an order
- Specify order quantities
- View order summary and edit order details
- Enter customer and order details
- Generate PDF receipt

The frontend communicates with a backend API to fetch product data and process orders.

Check a video with a demo of the application [here](https://www.youtube.com/watch?v=qUA44qn9nQg).

## 🛠 Technologies Used

- [@emotion/react](https://www.npmjs.com/package/@emotion/react) for styling
- [@react-pdf/renderer](https://www.npmjs.com/package/@react-pdf/renderer) for rendering PDFs
- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) for state management
- [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom), [@testing-library/react](https://www.npmjs.com/package/@testing-library/react), and [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) for testing
- [axios](https://www.npmjs.com/package/axios) for making HTTP requests
- [dompurify](https://www.npmjs.com/package/dompurify) for sanitizing HTML
- [react](https://www.npmjs.com/package/react) as the main UI library
- [react-awesome-reveal](https://www.npmjs.com/package/react-awesome-reveal) for animations
- [react-confirm-alert](https://www.npmjs.com/package/react-confirm-alert) for alerts
- [react-dom](https://www.npmjs.com/package/react-dom) for rendering into the DOM
- [react-icons](https://www.npmjs.com/package/react-icons) for icons
- [react-paginate](https://www.npmjs.com/package/react-paginate) for pagination
- [react-quill](https://www.npmjs.com/package/react-quill) for a rich text editor

## 🎁 Features

### Products

- Add/edit/delete products (admin only)
- Product list page with pagination
- Product detail page

![Product list](../frontend/src/assets/Screenshot5.png)

### Orders

- Add products to new order
- Edit order details
- View order summary
- Submit order
- View past orders
- Generate PDF receipt

![Sales view and filters](../frontend/src/assets/Screenshot2.png)

### Authentication

- Login/logout

![Autentication](../frontend/src/assets/Screenshot4.png)

### Admin

- Manage products, orders and users 

### Responsive Design

## 💻 Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
(Remember to start the backend server as well)

## 🖥️ Usage

After starting the development server, you can open `localhost:5173` in your browser to view the application.

### How to create a new account

1. Click the register button in the top right corner.
2. Enter the code provided by the admin and click on validate.
3. Fill in the form and chose a roll according to your role.

### How to add a new product

1. Login as admin.
2. Click on the add new product button at the sidebar.
3. Fill in the form and click on save.

### How to add a new order

1. Login as a sales rep.
2. Choose a product from the product list, enter the quantity and press add.
3. Repeat step 2 until all products are added to the order.
4. Go to view order and fill in the customer name.
5. Click on submit order to complete the order or delete it if you want to cancel it.
6. The order will be added to the order list and the PDF will be generated.

### How to view pending orders

1. Login as a production rep.
2. Orders will be shown from the oldest to the newest.
3. Click on order completed to mark the order as done.

### How to report an issue

1. Click on Support in the sidebar.
2. Fill in the form and click on submit.


## 🤝 Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

## 📜 License

This project is licensed under the terms of the MIT License.
[MIT](https://choosealicense.com/licenses/mit/)

**Notice from the Authors:**

Bonetto con Amor and the authors of this project reserve the right to be credited for their work. While the MIT License allows flexible usage, we kindly request that you acknowledge the original authors by providing appropriate attribution when using this software.

The MIT License ensures a permissive environment for your project while respecting the rights and contributions of the authors. It's important to emphasize that this license does not diminish our commitment to quality and responsible usage of the software we've created.

---

