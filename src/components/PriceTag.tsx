import formatPrice from "@/lib/formatPrice";

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag = ({ price, className }: PriceTagProps) => {
  return (
    <span className={`${className} badge bg-accent p-3`}>
      {formatPrice(price)}
    </span>
  );
};
export default PriceTag;
