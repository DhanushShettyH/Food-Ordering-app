import { Modal, useMantineTheme } from "@mantine/core"
import css from '../styles/OrderModal.module.css'
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../store/store";
import { useRouter } from "next/router";

export default function OrderModel({ opened, setOpened, PaymentMethod }) {

    const router = useRouter();

    const theme = useMantineTheme();

    const [FormData, setFormData] = useState({})

    const resetCart = useStore((state) => state.resetCart)

    const handleInput = (e) => {
        //this is technique to store input insted of individual usestate for each input 
        setFormData({ ...FormData, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const id = await createOrder({ ...FormData, total, PaymentMethod })
        toast.success("Order Placed")
        resetCart();
        {
            typeof window !== 'undefined' && localStorage.setItem('order', id)
        }
        router.push(`/order/${id}`)
    }

    const total = typeof window !== 'undefined' && localStorage.getItem('total')
    return (
        <Modal
            overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => setOpened(null)} //we again making setpaymentmethod set to null after closing this modal
        >

            {/* Modal content */}
            <form onSubmit={handlesubmit} className={css.formContainer}>

                <input onChange={handleInput} type="text" name="name" required placeholder="Name" />
                <input onChange={handleInput} type="text" name="phone" required placeholder="Phone number" />
                <textarea onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>
                <span>You will pay <span>$ {total}</span> on delivery </span>

                <button type="submit" className="btn">Place Order</button>
            </form>
            <Toaster />
        </Modal>
    )
}
