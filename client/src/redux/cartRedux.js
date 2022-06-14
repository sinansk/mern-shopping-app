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
  },
});

export const { addProduct, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
