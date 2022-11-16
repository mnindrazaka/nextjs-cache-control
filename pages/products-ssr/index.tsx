import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from "../../src/screens";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<
  ProductListScreenProps
> = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );
  const page = 1;
  const props = await getProductListScreenInitialProps({
    page,
    path: "/products-ssr",
  });
  return { props };
};

export default ProductListScreen;
