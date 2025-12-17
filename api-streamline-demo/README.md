# API Streamline Demo & Integration Guide

This repository demonstrates how to integrate with **API Streamline**, a powerful tool for mocking REST APIs instantly.

## 🚀 What is API Streamline?

API Streamline allows you to:
1.  **Define Resources**: Visually create data schemas (e.g., Users, Products) in the dashboard.
2.  **Generate Data**: Automatically populate resources with realistic Faker.js data.
3.  **Consume APIs**: Get instant, production-ready REST endpoints for your frontend.

## 📦 Examples Included

This repository contains examples for different environments:

-   [**JavaScript (Node.js/Browser)**](./js-client): Simple fetch examples using raw JavaScript.
-   [**React Client**](./react-client): A complete React component demonstrating CRUD operations.
-   [**Next.js (Server Components)**](./nextjs-client): *Coming soon* - How to fetch data in Next.js App Router.

## 🛠 Quick Start

1.  **Create an Account**: Go to [https://api.streamline.dev](https://api.streamline.dev) (or your local instance) and sign up.
2.  **Create a Project**: Create a new project in the dashboard.
3.  **Define a Resource**:
    *   Name: `products`
    *   Fields: `name` (string), `price` (number), `description` (string)
4.  **Get Your Endpoint**: Copy the endpoint URL (e.g., `https://api.streamline.dev/mock/PROJECT_ID/products`).

## 📚 API Reference

Standard REST methods are supported:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/resource` | List all items |
| `GET` | `/resource/:id` | Get single item |
| `POST` | `/resource` | Create new item |
| `PUT` | `/resource/:id` | Update item (full replace) |
| `PATCH` | `/resource/:id` | Update item (partial) |
| `DELETE` | `/resource/:id` | Delete item |

## 🤝 Support

If you have questions, please reach out to us at `support@apistreamline.dev` or check the [Documentation](https://api.streamline.dev/docs).
