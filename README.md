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
--header 'Cookie: connect.sid=s%3AMzVzmKE2aWiRHACLyGcdRkjgr-hM0qUh.N4C%2BAQSoq8wAP7fqJdDCtBe8M%2BEAsO2RtOnUB%2FaFzcw' \
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
--header 'x-publishable-api-key: pk_766b31d55b596b6d07aa0e12dc81df499867d47448eef7b5ece2158142fa3c45' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rvcl9pZCI6IiIsImFjdG9yX3R5cGUiOiJjdXN0b21lciIsImF1dGhfaWRlbnRpdHlfaWQiOiJhdXRoaWRfMDFKUU44Qzk0WFhNU0NSOEJXQzhBQ0Y3MlciLCJhcHBfbWV0YWRhdGEiOnt9LCJpYXQiOjE3NDMzOTY0MTQsImV4cCI6MTc0MzQ4MjgxNH0.48_vkcznJVCc8DLcQc3z8Dlb-U78ekThNAJd-qfJhPk' \
--header 'Cookie: connect.sid=s%3AMzVzmKE2aWiRHACLyGcdRkjgr-hM0qUh.N4C%2BAQSoq8wAP7fqJdDCtBe8M%2BEAsO2RtOnUB%2FaFzcw' \
--data-raw '{
    "email": "customer1@gmail.com"
}'
```

3. Login customer 

cURL Request
```bash
curl --location 'http://localhost:9000/auth/customer/emailpass' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AMzVzmKE2aWiRHACLyGcdRkjgr-hM0qUh.N4C%2BAQSoq8wAP7fqJdDCtBe8M%2BEAsO2RtOnUB%2FaFzcw' \
--data-raw '{
    "email": "customer1@gmail.com",
    "password": "supersecret"
}'
```

4. Post Wishlist from store - pass the token that you got from login customer into this api

cURL Request
```bash
curl --location 'http://localhost:9000/store/wishlist' \
--header 'x-publishable-api-key: pk_766b31d55b596b6d07aa0e12dc81df499867d47448eef7b5ece2158142fa3c45' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rvcl9pZCI6ImN1c18wMUpRTjhEQTBBV1hIUVFTRVhOWVRTVDkyUCIsImFjdG9yX3R5cGUiOiJjdXN0b21lciIsImF1dGhfaWRlbnRpdHlfaWQiOiJhdXRoaWRfMDFKUU44Qzk0WFhNU0NSOEJXQzhBQ0Y3MlciLCJhcHBfbWV0YWRhdGEiOnsiY3VzdG9tZXJfaWQiOiJjdXNfMDFKUU44REEwQVdYSFFRU0VYTllUU1Q5MlAifSwiaWF0IjoxNzQzMzk2NDU5LCJleHAiOjE3NDM0ODI4NTl9.mYAj6VnorrC7QV6Fs1K2OFAmp2PcTHkaIYN6HLe9bDk' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3Amhwc_r8nn2b7E4mXvjkst0X0Ic_jpQvs.ViNKO2XVFHVyg4r%2FmukYvVvLQ8YgSaHZw8YwQcBBNec' \
--data '{
    "region_id": "reg_01JPPQQ5XAVR857XGBQTXSVEVE",
    "variant_id": "variant_01JQE4RVYYRY8DYNZWT8PKTTDN"
}'
```


5. Get Wishlist (store) - pass the token that you got from login customer into this api

cURL Request
```bash
curl --location 'http://localhost:9000/store/wishlist?region_id=reg_01JPPQQ5XAVR857XGBQTXSVEVE' \
--header 'Content-Type: application/json' \
--header 'x-publishable-api-key: pk_766b31d55b596b6d07aa0e12dc81df499867d47448eef7b5ece2158142fa3c45' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rvcl9pZCI6ImN1c18wMUpRTjhEQTBBV1hIUVFTRVhOWVRTVDkyUCIsImFjdG9yX3R5cGUiOiJjdXN0b21lciIsImF1dGhfaWRlbnRpdHlfaWQiOiJhdXRoaWRfMDFKUU44Qzk0WFhNU0NSOEJXQzhBQ0Y3MlciLCJhcHBfbWV0YWRhdGEiOnsiY3VzdG9tZXJfaWQiOiJjdXNfMDFKUU44REEwQVdYSFFRU0VYTllUU1Q5MlAifSwiaWF0IjoxNzQzMzk2NDU5LCJleHAiOjE3NDM0ODI4NTl9.mYAj6VnorrC7QV6Fs1K2OFAmp2PcTHkaIYN6HLe9bDk' \
--header 'Cookie: connect.sid=s%3AMzVzmKE2aWiRHACLyGcdRkjgr-hM0qUh.N4C%2BAQSoq8wAP7fqJdDCtBe8M%2BEAsO2RtOnUB%2FaFzcw'
```

6. Get wishlist in Admin - Bearer token will be the access token from admin login

cURL Request
```bash
curl --location 'http://localhost:9000/admin/wishlist' \
--header 'x-publishable-api-key: pk_766b31d55b596b6d07aa0e12dc81df499867d47448eef7b5ece2158142fa3c45' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rvcl9pZCI6InVzZXJfMDFKUE03WTZIQUozRkIyWURRWlhNMjUzU1QiLCJhY3Rvcl90eXBlIjoidXNlciIsImF1dGhfaWRlbnRpdHlfaWQiOiJhdXRoaWRfMDFKUE03WTZLSEtLRENDSDBNMEUwNTZSWk0iLCJhcHBfbWV0YWRhdGEiOnsidXNlcl9pZCI6InVzZXJfMDFKUE03WTZIQUozRkIyWURRWlhNMjUzU1QifSwiaWF0IjoxNzQzMzk2NTI0LCJleHAiOjE3NDM0ODI5MjR9.0ENeHYsMND4lFHhQq4LRvb1qyLdFWpjPQOHPtx39lLM' \
--header 'Cookie: connect.sid=s%3AEuaqo9Dcz6YSTrMt5RsSIWEKVMirHqFi.InHGrW8MymZdo9OuphU9Z2NK62NBc2CTyPZ7T0llWtA'
```

7. Get wishlist of a customer - Bearer token will be the access token from admin login

cURL Request
```bash
curl --location 'http://localhost:9000/admin/wishlist/customer/cus_01JQN8DA0AWXHQQSEXNYTST92P' \
--header 'x-publishable-api-key: pk_766b31d55b596b6d07aa0e12dc81df499867d47448eef7b5ece2158142fa3c45' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rvcl9pZCI6InVzZXJfMDFKUE03WTZIQUozRkIyWURRWlhNMjUzU1QiLCJhY3Rvcl90eXBlIjoidXNlciIsImF1dGhfaWRlbnRpdHlfaWQiOiJhdXRoaWRfMDFKUE03WTZLSEtLRENDSDBNMEUwNTZSWk0iLCJhcHBfbWV0YWRhdGEiOnsidXNlcl9pZCI6InVzZXJfMDFKUE03WTZIQUozRkIyWURRWlhNMjUzU1QifSwiaWF0IjoxNzQzMzk2NTI0LCJleHAiOjE3NDM0ODI5MjR9.0ENeHYsMND4lFHhQq4LRvb1qyLdFWpjPQOHPtx39lLM' \
--header 'Cookie: connect.sid=s%3AXQMMmPwLwkAQAkA3N6bg0-hHRVwpPQY6.HvDoBgsZ7UaalVdjgm2cSFvjtfNrRp0VWPqUWyFS6Uw'
```

## Community & Contributions

The community and core team are available in GitHub Discussions, where you can ask for support, discuss roadmap, and share ideas.
