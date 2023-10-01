import Image from "next/image";
import Layout from "../components/Layout";
import { useStore } from "../store/store";
import css from '../styles/Cart.module.css'
import { urlFor } from "../lib/client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import OrderModel from "../components/OrderModel";
import { useRouter } from "next/router";

export default function Cart() {
    const CartData = useStore((state) => state.cart)
    const removePizza = useStore((state) => state.removePizza)
    const [PaymentMethod, setPaymentMethod] = useState(null)
    const [Order, setOrder] = useState(
        typeof window !== 'undefined' && localStorage.getItem('order')
    )
    const router = useRouter();

    const handleremove = (i) => {
        removePizza(i);
        toast.error("Item removed")
    }

    // it is taking all pizza from cart a is initially 0 given, b is pizza (it iterate all over pizza)
    const total = () => CartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0)

    const handleOnDelivery = () => {
        setPaymentMethod(0);
        // we can't set localitem this directly because in nextjs every thing render on server side not clint side. so we would get localstorage of server side so in server side there is no browser window 
        typeof window !== 'undefined' && localStorage.setItem('total', total())
    }
    const handleCheckout = async () => {
        typeof window !== 'undefined' && localStorage.setItem('total', total())
        setPaymentMethod(1);
        // requesting ot stripe api
        const response = await fetch('api/stripe', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(CartData.pizzas),
        });
        if (response.status === 500) return;
        const data = await response.json();
        toast.loading("Redirecting...");
        router.push(data.url); //is resonse is successful we redirect ot checkout session
    }
    return (
        <Layout>
            <div className={css.container}>

                {/* Details */}
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Pizza</th>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={css.tbody}>
                            {CartData.pizzas.length > 0 &&
                                CartData.pizzas.map((pizza, i) => {
                                    const src = urlFor(pizza.image).url()
                                    return (
                                        <tr key={i}>
                                            <td
                                                className={css.imageTd}
                                            >
                                                <Image
                                                    loader={() => src}
                                                    src={src}
                                                    alt=""
                                                    objectFit="cover"
                                                    width={85}
                                                    height={85}
                                                    unoptimized={true}
                                                />
                                            </td>
                                            <td>
                                                {pizza.name}
                                            </td>
                                            <td>
                                                {
                                                    pizza.size === 0 ?
                                                        "small" :
                                                        pizza.size === 1 ?
                                                            "Medium" :
                                                            "Large"
                                                }
                                            </td>
                                            <td>
                                                {pizza.price}
                                            </td>
                                            <td>
                                                {pizza.quantity}
                                            </td>
                                            <td>
                                                {pizza.price * pizza.quantity}
                                            </td>
                                            <td style={{ color: "var(--themeRed)", cursor: "pointer" }} onClick={() => handleremove(i)}>
                                                x
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>



                {/* Summary */}
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.CartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{CartData.pizzas.length}</span>
                        </div>

                        <div>
                            <span>Total</span>
                            <span>$ {total()}</span>
                        </div>
                    </div>

                    {!Order && CartData.pizzas.length > 0 ? (
                        <div className={css.button}>
                            <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
                            <button className="btn" onClick={handleCheckout}>Pay Now</button>
                        </div>
                    ) : null}

                </div>
            </div>
            <Toaster />

            {/* Model - i want this open when payment method is 0*/}
            <OrderModel
                opened={PaymentMethod === 0}
                setOpened={setPaymentMethod}
                PaymentMethod={PaymentMethod}
            />
        </Layout>
    )
}
