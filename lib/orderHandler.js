// this function called by orderModel.jsx
export const createOrder = async ({ name, phone, address, total, PaymentMethod }) => {
    // express and axios is also used to work with api
    const res = await fetch('/api/order', {
        method: "POST",
        body: JSON.stringify({
            name: name,
            phone: phone,
            address: address,
            total: parseFloat(total),
            method: PaymentMethod,
            status: 1
        }),
    });
    const id = await res.json();
    return id;

}
// after this success full api call throuch pages > api > order
// there we get response as order id here we store it in id again here we return id to orderModel.jsx