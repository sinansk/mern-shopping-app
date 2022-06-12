import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import {emptyCart} from "../redux/cartRedux";
import {useDispatch} from "react-redux";

const Success = () => {
    const location = useLocation();
    //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
    const data = location.state.data;
    console.log(data)
    const cart = useSelector(state => state.cart);
    console.log(cart)
    const user = useSelector(state=>state.user.currentUser);
    console.log(user)
    const [orderId, setOrderId] = useState(null);
    const dispatch = useDispatch()
  
    useEffect(() => {
      const createOrder = async () => {
        try {
          const res = await userRequest.post("/orders", {
            userId: user._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          });
          console.log(res)
          setOrderId(res.data._id);
        } catch {}
      };
      data && createOrder();
    }, [cart, data, user]);
    

    const empty = () => {
        dispatch(emptyCart({}));
    };
    useEffect(() => {
        empty();
    }, [])


  
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
          <Link  to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </Link>
      </div>
    );
  };
  
  export default Success;