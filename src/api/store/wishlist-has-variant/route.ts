import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const customerId = req.auth_context.actor_id;
  if (!req.query.variant_id) {
    return res.status(400).send({ message: "variant_id is required" });
  }
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { data: wishlist } = await query.graph({
    entity: "wishlists",
    filters: {
      customer_id: customerId as unknown as undefined,
    },
    fields: ["*"],
  });

  if (!(wishlist.length > 0)) {
    // No wishlist found for the customer
    return res.status(200).json(false);
  }

  const { data: wishlistItem } = await query.graph({
    entity: "wishlist_item",
    filters: {
      variant_id: req.query.variant_id as unknown as undefined,
      wishlist_id: wishlist[0].id as unknown as undefined,
    },
    fields: ["*"],
  });

  res.status(200).json(wishlistItem.length ? true : false);
}
