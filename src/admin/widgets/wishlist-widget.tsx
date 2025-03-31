import { defineWidgetConfig } from "@medusajs/admin-sdk";
import {
  Container,
  createDataTableColumnHelper,
  DataTable,
  DataTableSortingState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import {
  DetailWidgetProps,
  AdminCustomer,
  AdminProductVariant,
  AdminProduct,
} from "@medusajs/framework/types";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../utils/sdk";
import { useCallback, useMemo, useState } from "react";
import { Thumbnail } from "../components/thumbnail";
import { ProductHeader } from "../components/product-header/product-header";
import { useNavigate } from "react-router-dom";

const VARIANT_PAGE_SIZE = 10;

const variantColumnHelper = createDataTableColumnHelper<AdminProductVariant>();

const useVariantColumns = () => {
  return useMemo(
    () => [
      variantColumnHelper.accessor("title", {
        header: () => (
          <div className="flex h-full w-full items-center">
            <span>Variant</span>
          </div>
        ),
        enableSorting: true,
        sortLabel: "Variant Title",
        sortAscLabel: "Ascending (A-Z)",
        sortDescLabel: "Descending (Z-A)",
        cell: ({ row }) => (
          <div className="flex h-full w-full max-w-[250px] items-center gap-x-3 overflow-hidden">
            <div className="w-fit flex-shrink-0">
              <Thumbnail src={row?.original?.product?.thumbnail} />
            </div>
            <span title={row.original?.title || ""} className="truncate">
              {row.original?.title}
            </span>
          </div>
        ),
      }),
      variantColumnHelper.accessor("product", {
        header: () => <ProductHeader />,
        enableSorting: true,
        sortLabel: "Product Title",
        sortAscLabel: "Ascending (A-Z)",
        sortDescLabel: "Descending (Z-A)",
        cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.product?.title}
          </div>
        ),
      }),
    ],
    []
  );
};

type WishlistAdminType = {
  products: AdminProduct[];
  variants: AdminProductVariant[];
  wishlist: any[];
};

const WishlistWidget = ({ data }: DetailWidgetProps<AdminCustomer>) => {
  const [pageIndex, setPageIndex] = useState(0);

  const [sorting, setSorting] = useState<DataTableSortingState | null>({
    id: "title",
    desc: false,
  });

  console.log("sorting", sorting);
  console.log("pageIndex", pageIndex);

  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  // Get wishlist data
  const { data: wishlistData } = useQuery<WishlistAdminType>({
    queryFn: () => sdk.client.fetch(`/admin/wishlist/customer/${data.id}`, {}),
    queryKey: ["wishlist", data.id],
  });

  // Memoize variant IDs to prevent unnecessary recalculations
  const wishlistVariantIds = useMemo(
    () => wishlistData?.variants?.map((x: AdminProductVariant) => x.id) || [],
    [wishlistData?.variants]
  );

  // Get variant data
  const { data: variantList } = useQuery({
    queryFn: () =>
      sdk.admin.productVariant.list({
        id: wishlistVariantIds,
        q: searchValue,
        order: sorting?.desc ? `-${sorting.id}` : sorting?.id,
      }),
    queryKey: ["variants", wishlistVariantIds, sorting, searchValue],
    enabled: wishlistVariantIds.length > 0,
  });

  const columns = useVariantColumns();

  const table = useDataTable({
    columns,
    data: variantList?.variants ?? [],
    getRowId: (original: AdminProductVariant) => original.id,
    rowCount: variantList?.count ?? 0,
    isLoading: false,
    pagination: {
      state: {
        pageIndex,
        pageSize: VARIANT_PAGE_SIZE,
      },
      onPaginationChange: ({ pageIndex }) => {
        setPageIndex(pageIndex);
      },
    },
    sorting: {
      state: sorting,
      onSortingChange: setSorting,
    },
    onRowClick: (event, row) => {
      const productId = (row as any)?.original?.product?.id;
      const variantId = row.id;
      navigate(`/products/${productId}/variants/${variantId}`);
    },
    search: {
      debounce: 1000,
      state: searchValue,
      onSearchChange: useCallback((value: string) => {
        setSearchValue(value);
        setPageIndex(0);
      }, []),
    },
  });

  return (
    <Container className="divide-y p-0">
      <DataTable instance={table}>
        <DataTable.Toolbar className="flex justify-between items-center">
          <div className="flex items-center justify-between">
            <Heading level="h2">Wishlist Items</Heading>
          </div>
          <div className="flex gap-4">
            <DataTable.Search autoFocus={true} placeholder="Search" />
            <DataTable.SortingMenu tooltip="Sort" />
          </div>
        </DataTable.Toolbar>
        <DataTable.Table
          emptyState={{
            empty: {
              heading: "No Products",
              description: "There are no products in wishlist",
            },
            filtered: { heading: `No results for "${searchValue}"` },
          }}
        />
        <DataTable.Pagination />
      </DataTable>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "customer.details.after",
});

export default WishlistWidget;
