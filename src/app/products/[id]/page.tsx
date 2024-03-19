import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { increaseProductQuantity } from "./actions";

interface ProductPageProps {
  params: { id: string };
}

/* 
Remember in Add Product page, we exported the metadata, to give a separate name for the page in the browser tab. We can do something similar in dynamic routes as well. The approach is slightly different. 

We use an async function, generateMetadata. Remember, this name is special and you must use only this name for this feature to work. The return type of the function is Promise<Metadata>. The Metadata is coming from the next. So, Promise<Metadata> mean, a Promise type that resolves with a value of type Metadata.

Why is this function async?

To generate metadata for each product, we must fetch the product from the database. Fetching is an async operation. And that's why it is an async function. But we're already fetching the product inside ProductPage:

const product = await prisma.product.findUnique({ where: { id } });

Doing the same operation again inside the generateMetadata is a wasteful process. This is not an efficient approach. So we cut the above line from ProductPage and put it inside a async callback function of cache. cache is coming from react. To the async callback function we pass the id of product we need to fetch. This fetched product is stored in the cache. Now check the comment in ProductPage.

Whenever we need to fetch the product we can call the getProduct function. The product will be in cache, and we can access it from there.
*/

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product?.name + " | EmptyWallet",
    description: product?.description,
  };
}

// All async function return Promise, that's why the r

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id); // We call the getProduct by passing the id. We get the product from the cached data for the id we passed.

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={increaseProductQuantity}
        />
      </div>
    </div>
  );
};
export default ProductPage;
