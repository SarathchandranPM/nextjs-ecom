import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import setProductQuantity from "./actions";
import formatPrice from "@/lib/formatPrice";

export const metadata = {
  title: "Your Cart | EmptyWallet",
};

const CartPage = async () => {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
      {cart?.items.map((cartItem) => {
        return (
          <CartEntry
            cartItem={cartItem}
            key={cartItem.id}
            setProductQuantity={setProductQuantity}
          />
        );
      })}
      {!cart?.items.length && <p>Your Cart is empty</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">Check Out</button>
      </div>
    </div>
  );
};
export default CartPage;
