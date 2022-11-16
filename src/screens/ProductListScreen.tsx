import React from "react";
import Link from "next/link";
import { getProducts, ProductsApiResponse } from "../fetchers";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";

export type ProductListScreenProps = {
  productsResponse: ProductsApiResponse | null;
  page: number;
  path: string;
};

const LIMIT = 10;

export async function getProductListScreenInitialProps(config: {
  page: number;
  path: string;
}): Promise<ProductListScreenProps> {
  const skip = LIMIT * (config.page - 1);
  const productsResponse: ProductsApiResponse = await getProducts({
    skip,
    limit: LIMIT,
  });
  return { page: config.page, productsResponse, path: config.path };
}

export function ProductListScreen(props: ProductListScreenProps) {
  const [productsResponse, setProductsResponse] =
    React.useState<ProductsApiResponse | null>(props.productsResponse);
  const [loading, setLoading] = React.useState(props.productsResponse === null);
  const [error, setError] = React.useState<string | null>(null);

  const totalPage = Math.ceil((productsResponse?.total ?? 0) / LIMIT);
  const skip = LIMIT * (props.page - 1);

  React.useEffect(() => {
    if (
      props.productsResponse === null ||
      props.productsResponse.skip !== skip
    ) {
      setLoading(true);
      getProducts({ skip, limit: LIMIT })
        .then(setProductsResponse)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setProductsResponse(props.productsResponse);
    }
  }, [props.productsResponse, skip]);

  return (
    <Flex
      backgroundColor="gray.100"
      height="100vh"
      justifyContent="center"
      overflowY="scroll"
    >
      <Box maxWidth="container.xl" padding={["1", "2", "8"]}>
        <Image
          alt="IfItDoesntMatchAnyMedia"
          width="100%"
          src="https://skillacademy-prod-image.skillacademy.com/image/f67bf7a1-66b2-4545-926f-0d61378ca54a.jpg"
        />
        <Box marginBottom="5">
          <Heading>Products</Heading>
          <Text fontFamily="Montserrat">We sell our quality products</Text>
        </Box>

        {loading ? (
          <p>loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (productsResponse?.products.length ?? 0) === 0 ? (
          <p>empty data</p>
        ) : (
          <>
            <Grid
              columnGap="5"
              templateColumns={[
                "1fr",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
              ]}
            >
              {productsResponse?.products.map(
                ({ id, title, price, thumbnail }) => (
                  <GridItem key={id}>
                    <Box borderRadius="xl" overflow="hidden">
                      <Box
                        backgroundImage={`url('${thumbnail}')`}
                        backgroundPosition="center"
                        backgroundSize="cover"
                        width="100%"
                        height="52"
                      />
                      <Box
                        padding="5"
                        borderRadius="xl"
                        backgroundColor="white"
                        position="relative"
                        bottom="5"
                      >
                        <Heading size="md" noOfLines={1}>
                          {title}
                        </Heading>
                        <Text marginBottom="5">$ {price}</Text>
                        <Button
                          width="100%"
                          backgroundColor="blue.500"
                          color="white"
                        >
                          Buy
                        </Button>
                      </Box>
                    </Box>
                  </GridItem>
                )
              )}
            </Grid>

            <Flex flexWrap="wrap">
              {Array.from(Array(totalPage)).map((_, index) => (
                <Box key={index} marginBottom="5" marginRight="5">
                  <Link href={`${props.path}/${index + 1}`}>
                    <Button
                      disabled={props.page === index + 1}
                      backgroundColor="gray.300"
                      _hover={{ backgroundColor: "gray.500", color: "white" }}
                    >
                      {index + 1}
                    </Button>
                  </Link>
                </Box>
              ))}
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default ProductListScreen;
