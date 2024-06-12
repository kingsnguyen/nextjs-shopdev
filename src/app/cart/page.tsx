import { getCart } from "@/src/lib/db/cart"
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/src/lib/db/format";

export const metadata = {
    title: "Your Cart- Shopdev"
}

export default async function CartPage() {
    const cart = await getCart();

    return (
        <div>
            <h1 className="text-3xl font-bold md-6 mb-6">Shopping cart</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
            ))}
            {!cart?.items.length && <p> Your cart is empty.</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Checkout</button>
            </div>
        </div>
    )
}