import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { emptyCart, decreaseCart, increaseCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "20px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  ${mobile({ width: "100px" })}
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 0.5px solid black;
`;
const ProductSize = styled.span``;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const Cart = () => {
  const KEY = process.env.REACT_APP_STRIPE;
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
    console.log(stripeToken);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });

        navigate("/success", { state: { data: res.data } });
      } catch {}
    };
    if (stripeToken && cart.products.length > 0) {
      makeRequest();
    }
  }, [stripeToken, cart, navigate]);
  console.log(stripeToken);

  const empty = () => {
    dispatch(emptyCart({}));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product) => {
    dispatch(increaseCart(product));
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({cart.products.length})</TopText>
            {/* <TopText>Your Wishlist</TopText> */}
          </TopTexts>
          <TopButton type="filled" onClick={empty}>
            CLEAR CART
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.image} />
                  </Link>
                  <Details>
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                    </Link>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => handleIncreaseCart(product)}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    {product.quantity === 1 ? (
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDecreaseCart(product)}
                      />
                    ) : (
                      <RemoveIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDecreaseCart(product)}
                      />
                    )}
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.subtotal}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem
              style={{ textDecoration: cart.total > 50 && "line-through" }}
            >
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {cart.shipping} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem
              style={{ textDecoration: cart.total < 50 && "line-through" }}
            >
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -{cart.shipping}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total} </SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="ShopMania"
              image="https://i.imgur.com/nqj549k.jpg"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button disabled={cart.products.length === 0 || !currentUser}>
                {!currentUser ? "YOU MUST LOGIN FIRST!" : "CHECKOUT NOW"}
              </Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
