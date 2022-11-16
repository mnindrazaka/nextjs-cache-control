import { GetServerSideProps } from "next";
import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from "../../src/screens";

type Params = {
  page: string;
};

export const getServerSideProps: GetServerSideProps<
  ProductListScreenProps,
  Params
> = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, max-age=60, stale-while-revalidate=300"
  );
  const pageParams = ctx.params?.page ?? "1";
  const page = parseInt(pageParams);
  const props = await getProductListScreenInitialProps({
    page,
    path: "/products-ssr",
  });
  return { props };
};

export default ProductListScreen;
