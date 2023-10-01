import Image from 'next/image'
import css from '../styles/Menu.module.css'
import { urlFor } from '../lib/client'
import Link from 'next/link';

export default function Menu({ pizzas }) {
    return (
        <div className={css.container}>
            <div className={css.heading}>
                <span>OUR MENU</span>
                <span>Menu That Always</span>
                <span>Make you Fall In Love</span>
            </div>



            <div className={css.menu}>
                {/* pizzas */}
                {pizzas.map((pizza, id) => {
                    //urlFor is created in clint.js
                    const src = urlFor(pizza.image).url()
                    return (
                        <Link href={`./pizza/${pizza.slug.current}`}>
                        <div className={css.pizza} key={id}>
                            <div className={css.ImageWrapper}>
                                <Image
                                    // this function act as parameter to image
                                    loader={() => src}
                                    src={src} 
                                    alt=''
                                    objectFit='cover'
                                    layout='fill' />
                            </div>
                            <span>{pizza.name}</span>
                            <span><span style={{color:"var(--themeRed)"}}>$</span> {pizza.price[0]}</span>
                            
                        </div>
                        </Link>
                    )
                })}
            </div>


        </div>
    );
}
