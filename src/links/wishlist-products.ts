import { defineLink, DefineLinkExport } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import WishlistModule from "../modules/wishlist";

let link: DefineLinkExport | null = null;

link = defineLink(ProductModule.linkable.product, {
  linkable: WishlistModule.linkable.wishlistItem,
  deleteCascade: true,
});

export default link;
