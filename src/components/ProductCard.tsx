import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

/* In the schema.prisma we have defined the model for our product. We can import that from prima/client. Now let's create an interface for the prop form ProductCard component. This interface will have one property- product. This will be of type Product as defined in the schema.prisma file:

model Product {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  description String
  imageUrl    String
  name        String
  price       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}

This product property will have all the above properties we defined for the Product model.
*/

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    7 * 24 * 60 * 60 * 1000;
  return (
    <Link
      href={"/products" + product.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
};
export default ProductCard;
