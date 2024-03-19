import formatPrice from "@/lib/formatPrice";

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag = ({ price, className }: PriceTagProps) => {
  return <span className={`${className} badge`}>{formatPrice(price)}</span>;
};
export default PriceTag;