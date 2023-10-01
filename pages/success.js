import Layout from "../components/Layout";
import OrderModel from "../components/OrderModel";


export default function success() {
  return (
    <Layout>
        <OrderModel opened={true} PaymentMethod={1}/>
    </Layout>
  )
}
