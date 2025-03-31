import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;
  console.log({ id });

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { data } = await query.graph({
    entity: "wishlists",
    fields: ["*", "items.*"],
    filters: {
      id,
    },
  });

  res.send({ wishlist: data });
}
