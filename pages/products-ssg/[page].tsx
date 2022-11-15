import { GetStaticProps, GetStaticPaths } from "next";
import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from "../../src/screens";

type Params = {
  page: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { productsResponse } = await getProductListScreenInitialProps({
    page: 1,
    path: "/products-ssg",
  });
  const totalPage = productsResponse
    ? Math.ceil(productsResponse.total / productsResponse.limit)
    : 0;
  const paths = Array.from(Array(totalPage)).map((_, index) => ({
    params: { page: String(index + 1) },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<
  ProductListScreenProps,
  Params
> = async (ctx) => {
  const pageParams = ctx.params?.page ?? "1";
  const page = parseInt(pageParams);
  const props = await getProductListScreenInitialProps({
    page,
    path: "/products-ssg",
  });
  return { props };
};

export default ProductListScreen;
