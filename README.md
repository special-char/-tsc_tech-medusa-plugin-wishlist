<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa Plugin Starter
</h1>


<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
</p>

## Compatibility

This starter is compatible with versions >= 2.4.0 of `@medusajs/medusa`.

## Introduction

The Wishlist Plugin is a feature-rich extension for eCommerce platforms that allows customers to save products for future reference. This enhances the user experience by enabling shoppers to curate their favorite products and return later to complete their purchases.


## Features

- Add products to the wishlist with a single click.

- Remove items from the wishlist easily.

- Persistent wishlist across sessions.

- User-specific wishlists (if authentication is enabled).

- Lightweight and optimized for performance.

- Responsive design for mobile and desktop compatibility.


## Installation

```
npm install @tsc_tech/medusa-plugin-wishlist
```
OR
```
yarn add @tsc_tech/medusa-plugin-wishlist
```

## Configuration

Step:1 Update Medusa Configuration Modify your medusa-config.ts to include the wishlist plugin:

```
module.exports = defineConfig({
  plugins: [
    {
      resolve: "@tsc_tech/medusa-plugin-wishlist",
      options: {},
    },
    ],
})
```

Step:2 Run Migrations

```
npx medusa db:migrate
```

You can see the wishlist items added by a customer in the admin-dashboard

1. Log in to your admin panel.

2. Navigate to Customers.

3. In the customer detail page there is a section for wishlist items.

## Postman APIs to test the plugin

1. Register customer 'auth/customer/emailpass/register'

cURL Request
```bash
curl --location 'http://localhost:9000/auth/customer/emailpass/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "customer1@gmail.com",
    "password": "supersecret"
}'
```

2. Register customer in store 'store/customers' - pass the token that you got register customer into this api.

cURL Request
```bash
curl --location 'http://localhost:9000/store/customers' \
--header 'Content-Type: application/json' \
--header 'x-publishable-api-key: {{your-publishable-api-key}}' \
--header 'Authorization: Bearer {{your-bearer-token}}' \
--data-raw '{
    "email": "customer1@gmail.com"
}'
```

3. Login customer 

cURL Request
```bash
curl --location 'http://localhost:9000/auth/customer/emailpass' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "customer1@gmail.com",
    "password": "supersecret"
}'
```

4. Post Wishlist from store - pass the token that you got from login customer into this api

cURL Request
```bash
curl --location 'http://localhost:9000/store/wishlist' \
--header 'x-publishable-api-key: {{your-publishable-api-key}}' \
--header 'Authorization: Bearer {{your-bearer-token}}' \
--header 'Content-Type: application/json' \
--data '{
    "region_id": {{regionId}},
    "variant_id": {{variantId}}
}'
```


5. Get Wishlist (store) - pass the token that you got from login customer into this api

cURL Request
```bash
curl --location 'http://localhost:9000/store/wishlist?region_id={regionId}' \
--header 'Content-Type: application/json' \
--header 'x-publishable-api-key: {{your-publishable-api-key}}' \
--header 'Authorization: Bearer {{your-bearer-token}}' \
```

6. Get wishlist in Admin - Bearer token will be the access token from admin login

cURL Request
```bash
curl --location 'http://localhost:9000/admin/wishlist' \
--header 'Authorization: Bearer {{your-bearer-token}}' \
```

7. Get wishlist of a customer - Bearer token will be the access token from admin login

cURL Request
```bash
curl --location 'http://localhost:9000/admin/wishlist/customer/{customerId}' \
--header 'Authorization: Bearer {{your-bearer-token}}' \
```

8. Check if wishlist has variant

cURL Request
```bash
curl --location 'localhost:9000/store/wishlist-has-variant?variant_id=variantId' \

--header 'x-publishable-api-key: {{your-publishable-api-key}}' \

--header 'Authorization: Bearer {{your-bearer-token}}' \ 
```

## Community & Contributions

The community and core team are available in GitHub Discussions, where you can ask for support, discuss roadmap, and share ideas.
