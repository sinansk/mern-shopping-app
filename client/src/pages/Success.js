import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { emptyCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const Container = styled.div`
  font-size: 22px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.data;
  console.log(data);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        console.log(res);
        setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    if (data && cart.products.length > 0) {
      createOrder();
    }
  }, [cart, data, currentUser, dispatch]);

  return (
    <Container>
      <DoneOutlineIcon style={{ color: "teal", fontSize: "48px" }} />
      {orderId
        ? `Order has been created successfully. Your order number is: ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/">
        <Button>GO TO HOMEPAGE</Button>
      </Link>
    </Container>
  );
};

export default Success;
