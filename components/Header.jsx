// edf  es6 extension
import css from '../styles/Header.module.css'
import Image from 'next/image'
import Logo from '../public/Logo.png'
import { UilShoppingBag, UilReceipt } from '@iconscout/react-unicons'
import { useStore } from '../store/store'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function Header() {

    const [Order, setOrder] = useState("")
    useEffect(() => {
        // in OrderModal.jsx we set order id
        setOrder(localStorage.getItem("order"))

    }, [])


    const state = useStore((state) => state)
    const item = useStore((state) => state.cart.pizzas.length)

    return (
        <div className={css.header}>
            {/* logo side */}
            <div className={css.logo}>
                {/* Image component of next.js it make img responsive */}
                <Image src={Logo} alt="" width={50} height={50} />
                <span>Fudo</span>
            </div>

            {/* menu sie */}
            <ul className={css.menu}>
                <li>
                    <Link href='../'>Home</Link>
                </li>
                <li>Menu</li>
                <li>Contact</li>
            </ul>

            {/* Right Side */}
            <div className={css.rightside}>
                <Link href='/cart'>
                    <div className={css.cart}>
                        {/* this icon get by react icon */}
                        <UilShoppingBag size={35} color="#2E2E2E" />
                        <div className={css.badge}>{item}</div>
                    </div>
                </Link>


                {Order &&
                    (
                        <Link href={`/order/${Order}`}>
                            <div className={css.cart}>
                                {/* this icon get by react icon */}
                                <UilReceipt size={35} color="#2E2E2E" />
                                {Order != "" && <div className={css.badge}>1</div>}
                            </div>
                        </Link>
                    )}

            </div>
        </div>
    )

}
