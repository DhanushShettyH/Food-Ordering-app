import client from "../../lib/client";
import Layout from "../../components/Layout";
import css from "../../styles/Order.module.css";
import { UilBill, UilBox } from "@iconscout/react-unicons";
import Onway from "../../public/onway.png";
import Spinner from "../../public/spinner.svg";
import Image from "next/image";
import Cooking from "../../public/cooking.png";
import { useEffect } from "react";

export const getServerSideProps = async ({ params }) => {
  const order = await client.fetch(
    `*[_type == 'order' && _id == '${params.id}']`
  );

  return {
    props: {
      order: order[0],
      // here 0 , when we run query it returns array
    },
  };
};

export default function Orders({ order }) {
  // here order is serverside props
  useEffect(() => {
    if (order.status > 3) {
      localStorage.clear();
    }
  }, [order]);
  return (
    <Layout>
      <div className="flex flex-col gap-16 mt-12 items-center justify-center">
        <span className={css.heading}>order process</span>
        <div className=" w-full md:w-[40%] px-5">
          <div className={css.details}>
            <div>
              <span>Order Id</span>
              <span>{order._id}</span>
            </div>
            <div>
              <span>Customer Name</span>
              <span>{order.name}</span>
            </div>
            <div>
              <span>Phone</span>
              <span>{order.phone}</span>
            </div>
            <div>
              <span>Method</span>
              <span>
                {order.method === 0
                  ? "cash on Deliver"
                  : "Online Payment (Paid)"}
              </span>
            </div>
            <div>
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-14 flex-col md:flex-row md:gap-60">
          <div className={css.status}>
            <UilBill width={50} height={50} />
            <span>Payment</span>
            {order.method === 0 ? (
              <span className={css.pending}>On Delivery</span>
            ) : (
              <span className={css.completed}>Completed</span>
            )}
          </div>

          <div className={css.status}>
            <Image src={Cooking} alt="" width={50} height={50} />
            <span>Cooking</span>
            {order.status === 1 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 1 && (
              <span className={css.completed}>Completed</span>
            )}
          </div>

          <div className={css.status}>
            <Image src={Onway} alt="" width={50} height={50} />
            <span>OnWay</span>
            {order.status === 2 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 2 && (
              <span className={css.completed}>Completed</span>
            )}
          </div>

          <div className={css.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {order.status === 3 && (
              <div className={css.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.status > 3 && (
              <span className={css.completed}>Completed</span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
