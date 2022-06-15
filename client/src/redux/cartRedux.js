import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    shipping: 5,
    subtotal: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.subtotal += action.payload.price * action.payload.quantity;
      state.total += state.subtotal;
      state.total < 50
        ? (state.total += state.shipping)
        : (state.total = state.subtotal);
    },
    emptyCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
      state.subtotal = 0;
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
        state.subtotal -= state.products[itemIndex].price;
        state.total -= state.products[itemIndex].price;
      } else if (state.products[itemIndex].quantity === 1) {
        state.subtotal -= state.products[itemIndex].price;
        state.total -= state.products[itemIndex].price;

        const nextProducts = state.products.filter(
          (product) => product._id !== action.payload._id
        );
        state.products = nextProducts;
        state.quantity -= 1;
        console.log(state.products);
      }
      if (state.subtotal > 0 && state.subtotal < 50) {
        state.total += state.shipping;
      } else {
        state.total = state.subtotal;
      }
    },
  },
});

export const { addProduct, emptyCart, decreaseCart } = cartSlice.actions;
export default cartSlice.reducer;
