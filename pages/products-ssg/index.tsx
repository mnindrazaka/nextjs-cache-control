import {
  getProductListScreenInitialProps,
  ProductListScreen,
  ProductListScreenProps,
} from "../../src/screens";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<ProductListScreenProps> = async (
  _ctx
) => {
  const page = 1;
  const props = await getProductListScreenInitialProps({
    page,
    path: "/products-ssg",
  });
  return { props, revalidate: 60 };
};

export default ProductListScreen;
