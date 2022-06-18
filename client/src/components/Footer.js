import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#F2EBE9" })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>ShopMania</Logo>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make
        </Description>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/cart"
            >
              Cart
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/products/men"
            >
              Men Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/products/women"
            >
              Women Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/products/shoes"
            >
              Shoes
            </Link>
          </ListItem>
          {/* <ListItem>Order Tracking</ListItem> */}
          {/* <ListItem>Whislist</ListItem>
          <ListItem>Terms</ListItem> */}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnIcon style={{ marginRight: "10px" }} /> Yalova/TURKEY
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} />
          +90539 969 86 07
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon style={{ marginRight: "10px" }} />
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="mailto: sinan.sk@outlook.com.tr"
          >
            sinan.sk@outlook.com.tr
          </a>
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}

export default Footer;
