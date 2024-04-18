import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../../Orders.css";

export default function Orders() {
  const { user, fetchUserOrders } = useContext(UserContext);
  // fetchUserOrders();
  console.log("user.orders");
  console.log(user.orders);
  const orders = user.orders;
  return (
    <div className="orders">
      <h2>Your orders</h2>
      <span>
        <b>email:</b> {user.email}
      </span>
      <div className="">
        {orders.map((order, index) => {
          return (
            <div className="order" key={order._id}>
              <span className="order-index">{index + 1}</span>
              <div className="order-details">
                <span>
                  <b>Contact info:</b>
                </span>
                <span>Name: {order.name}</span>
                <span>Phone: {order.phone}</span>
                <span>Address: {order.address}</span>
              </div>
              <span>
                <b>Products:</b>
              </span>
              <div className="orders-products flex">
                {order.orderProducts.map((item) => {
                  return (
                    <div className="order-product" key={item.product?._id}>
                      <img
                        className="med-item-image"
                        src={item.product?.image}
                        alt={item.product?.name}
                      />
                      <div>{item.product?.name}</div>
                      <div>quantity: {item.quantity}</div>
                    </div>
                  );
                })}
              </div>
              <div className="order-total">{order.totalPrice && <b>Total: {order.totalPrice.toFixed(2)}</b>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
