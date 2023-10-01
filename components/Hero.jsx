import Image from 'next/image'
import css from '../styles/Hero.module.css'
import Cherry from '../assets/Cherry.png'
import HeroImage from '../assets/HeroImage.png'
import { UilPhone } from '@iconscout/react-unicons'
import Pizza1 from '../assets/italian_pizza.jpg'
export default function Hero() {
    return (
        <div className={css.container}>
            {/* left side */}
            <div className={css.left}>
                <div className={css.cherryDiv}>
                    <span>More than Faster</span>
                    <Image src={Cherry} alt='' width={40} height={25} priority={2} />
                </div>

                <div className={css.heroText}>
                    <span>Be The Fastest</span>
                    <span>In Delivering</span>
                    <span>
                        Your <span style={{ color: "var(--themeRed)" }}>Pizza</span>
                    </span>
                </div>

                <span className={css.miniText}>
                    Our Mission is to filling your tummy with delicious food and with and free delivery
                </span>

                {/* this btn is in global.css */}
                <button className={`btn ${css.btn}`}>
                    Get Started
                </button>
            </div>

            {/* right side */}
            <div className={css.right}>
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt='' layout='intrinsic' priority={1} /> {/*layout='intrinsic' this means it only contain space and width of it's parent imageContainer have */}
                </div>


                <div className={css.ContactUs}>
                    <span>Contact Us</span>
                    <div>
                        <UilPhone color='white' />
                    </div>
                </div>


                <div className={css.Pizza}>
                    <div>
                        <Image src={Pizza1} alt='' objectFit='cover' layout='intrinsic' priority={3} />{/*objectFit='cover' the croping is handled by next.js */}
                    </div>
                    <div className={css.details}>
                        <span>Italian Pizza</span>
                        <span><span style={{color:'var(--themeRed)'}}>$</span>7.49</span>
                    </div>
                </div>

            </div>
        </div>
    )


}
