import { authMiddleware } from "./middlewares/auth";

import { defineMiddlewares, MiddlewareRoute } from "@medusajs/framework";

const wishlistRoutesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/wishlist",
    method: "GET",
    middlewares: [authMiddleware],
  },
  {
    matcher: "/store/wishlist",
    method: "POST",
    middlewares: [authMiddleware],
  },
  {
    matcher: "/store/wishlist-has-variant",
    method: "GET",
    middlewares: [authMiddleware],
  },
];

export default defineMiddlewares(wishlistRoutesMiddlewares);
