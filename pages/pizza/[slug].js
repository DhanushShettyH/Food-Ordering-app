// we navigate dynamically so we write [slug] slug chages dinamically
import Image from 'next/image';
import Layout from '../../components/Layout'
import client, { urlFor } from '../../lib/client'
import css from '../../styles/Pizza.module.css'
import LeftArrow from '../../assets/arrowLeft.png'
import RightArrow from '../../assets/arrowRight.png'
import { useState } from 'react';
import { useStore } from '../../store/store';
import toast, {Toaster} from 'react-hot-toast';
export default function Pizza({ pizza }) {
    const src = urlFor(pizza.image).url()

    const [Size, setSize] = useState(1)
    const [Quantity, setQuantity] = useState(1)

    //handle quantity
    const handleQuantity = (type) => {
        type === "inc" ?
            setQuantity((prev) => prev + 1) :
            Quantity === 1 ? null : setQuantity((prev) => prev - 1)

    }


    //add to cart function
    const addPizza = useStore((state)=>state.addPizza)
    const addToCart = ()=>{
        //here also copying slug of pizza info along wiht image
        addPizza({...pizza,price:pizza.price[Size],quantity:Quantity,size:Size})
        
    toast.success("Added to cart")
    }
    return (
        <Layout>
            <div className={css.container}>
                <dic className={css.imageWrapper}>
                    <Image
                        loader={() => src}
                        src={src}
                        alt=''
                        layout='fill'
                        unoptimized objectFit='cover' />
                </dic>
                {/* Right side */}
                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>

                    <span><span style={{ color: "Var(--themeRed" }}>$</span>{pizza.price[Size]}</span>

                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.sizeVariants}>
                            <div
                                onClick={() => { setSize(0) }}
                                className={Size === 0 ? css.selected : ""}
                            >small</div>

                            <div
                                onClick={() => { setSize(1) }}
                                className={Size === 1 ? css.selected : ""}
                            >Medium</div>

                            <div
                                onClick={() => { setSize(2) }}
                                className={Size === 2 ? css.selected : ""}
                            >Large</div>
                        </div>
                    </div>

                    {/* Quantity counter */}
                    <div className={css.quantity}>
                        <span>Quantity</span>

                        <div className={css.counter}>
                            <Image src={LeftArrow}
                                height={20}
                                width={20}
                                alt=''
                                objectFit='contain'
                                onClick={()=>handleQuantity("dec")} />
                                {/* while passing parameter on click it should be in inside call back func */}

                            <span>{Quantity}</span>

                            <Image src={RightArrow}
                                height={20}
                                width={20}
                                alt=''
                                objectFit='contain'
                                onClick={()=>handleQuantity("inc")} />

                        </div>
                    </div>



                    {/* button */}
                    <div className={`btn ${css.btn}`} onClick={addToCart}>
                        Add to Cart
                    </div>
                </div>
                <Toaster/>
            </div>


        </Layout>
    )
}

export async function getServerSideProps(context) {
    let { slug = "" } = context.params;
    const pizza = await client.fetch(
        `*[_type=="pizza" && slug.current == "${slug}"][0]`
    );

    return {
        props: {
            pizza,
        },
    };
}