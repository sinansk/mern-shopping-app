import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/userRedux";

const Container = styled.div`
  width: "100vw";
  ${mobile({ height: "50px" })}
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: white;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0", flexWrap: "wrap" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
// const Language = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({ display: "none" })}
// `;
// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
//   ${mobile({ width: "50px", display: "none" })};
// `;
// const Input = styled.input`
//   border: none;
// `;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  display: inline-block;
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: "2" })}
`;
const MenuItem = styled.div`
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Announcement = styled.div`
  height: 30px;
  width: "100vw";
  background-color: teal;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  z-index: 10;
  ${mobile({ fontSize: "10px", height: "20px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const quantity = useSelector((state) => state.cart.quantity);
  console.log(quantity);
  // const {currentUser} = useSelector((state) => state.user);
  // console.log(currentUser)
  const dispatch = useDispatch();

  const logOut = (e) => {
    if (user) {
      e.preventDefault();
      dispatch(logoutSuccess());
    } else {
      return;
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <Logo style={{ textDecoration: "none" }}>ShopMania</Logo>
          </Link>
        </Center>
        <Right>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={user ? "/" : "/register"}
          >
            <MenuItem>{user ? user.username : "REGISTER"}</MenuItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={user ? "/" : "/login"}
          >
            <MenuItem>
              {user ? <MenuItem onClick={logOut}>LOG OUT</MenuItem> : `SIGN IN`}
            </MenuItem>
          </Link>
          <MenuItem>
            <Link to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
      <Announcement>Super Deal ! Free Shipping on Orders Over $50</Announcement>
    </Container>
  );
};

export default Navbar;
