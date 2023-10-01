import Stripe from 'stripe'
// these variable strings should be in .env file
const stripe = new Stripe(
    "sk_test_51NwEt5SEviBoHANKEOVNDx4JaRdAzx2BIEV3estLaW2i9KxF6ASK2SErptMv1rZXYSMBSkbyXMZ7tEfpPVjH4zPz005tmRmve6"
)
export default async function handler(req, res){
    if(req.method == 'POST'){
        try {
            const params = {
                submit_type:'pay',
                mode:"payment",
                payment_method_types:['card'],
                line_items:req.body.map((item)=>{
                    // this is formmate to sanity store images of document
                    const img = item.image.asset._ref;
                    console.log(img)
                    const newImage = img.replace(
                    "image-",
                    "https://cdn.sanity.io/images/fv2f77x6/production/" , //images/id of sanity project and production/dataset
                    )
                    .replace('-jpg','.jpg'); //sanity -jpg extension convert into .jpg

                    return{
                        price_data:{
                            currency:'usd',
                            product_data:{
                                name:item.name,
                                images:[newImage],
                            },
                            unit_amount:item.price*100
                        },
                        // amount is fixed can't be changed by user
                        adjustable_quantity:{
                            enabled:false,
                        },
                        quantity:item.quantity,
                    }
                }),
                success_url:`${req.headers.origin}/success`,
                cancel_url:`${req.headers.origin}/cart`
            };


            //checkout session
            const session = await stripe.checkout.sessions.create(params);
            console.log(session)
            res.status(200).json(session)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    else{
        res.setHeader("Allow","POST");
        res.status(405).end("Method not allowed")
    }
}