import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { WISHLIST_MODULE } from "../../../modules/wishlist";
import WishlistService from "../../../modules/wishlist/service";
import { WishlistDetailTypes } from "../../../modules/wishlist/models/wishlist-details";

export async function GET(
  req: MedusaRequest<WishlistDetailTypes>,
  res: MedusaResponse
) {
  const wishlistService: WishlistService = req.scope.resolve(WISHLIST_MODULE);

  const wishlist = await wishlistService.listWishlists(
    {},
    { relations: ["items"] }
  );
  res.status(200).json({ wishlist });
}
