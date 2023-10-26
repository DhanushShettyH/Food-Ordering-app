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



			<div className=" w-full grid grid-cols-1 gap-8 items-center justify-center md:grid-cols-3 md:pl-14">
				{/* pizzas */}
				{pizzas.map((pizza, id) => {
					//urlFor is created in clint.js
					const src = urlFor(pizza.image).url()
					return (
						<Link href={`./pizza/${pizza.slug.current}`} key={id}>
							<div
								className=" flex flex-col items-start gap-2 text-xl font-bold"
								key={id}>
								<div className={css.ImageWrapper}>
									<Image
										// this function act as parameter to image
										loader={() => src}
										src={src}
										alt=''
										objectFit='cover'
										layout='fill'
										unoptimized={true}
									/>
								</div>
								<span>{pizza.name}</span>
								<span><span style={{ color: "var(--themeRed)" }}>$</span> {pizza.price[0]}</span>

							</div>
						</Link>
					)
				})}
			</div>


		</div>
	);
}
