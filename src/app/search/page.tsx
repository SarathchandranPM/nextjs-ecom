import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";

interface searchPageProps {
  searchParams: { query: string };
}

const SearchPage = async ({ searchParams: { query } }: searchPageProps) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });
  if (products.length === 0) {
    return <div className="text-center">No products found</div>;
  }
  return (
    <div className="grid-col-1 md:grid-col-2 xl:grid-col-3 grid gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default SearchPage;
