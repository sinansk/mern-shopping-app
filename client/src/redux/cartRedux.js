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
      console.log(action.payload._id);
      const itemIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.products[itemIndex] = {
          ...state.products[itemIndex],
          quantity: state.products[itemIndex].quantity + 1,
        };
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }

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
        state.total = state.shipping + state.subtotal;
      } else {
        state.total = state.subtotal;
      }
    },

    increaseCart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (state.products[itemIndex].quantity >= 1) {
        state.products[itemIndex] = {
          ...state.products[itemIndex],
          quantity: state.products[itemIndex].quantity + 1,
        };
        state.subtotal += action.payload.price * 1;
        state.total += action.payload.price * 1;
      }
      if (state.subtotal > 0 && state.subtotal < 50) {
        state.total = state.shipping + state.subtotal;
      } else {
        state.total = state.subtotal;
      }
    },
  },
});
///REFACTORING YAP VE SWITCH CASE DURUMUNA AYIR///
export const { addProduct, emptyCart, decreaseCart, increaseCart } =
  cartSlice.actions;
export default cartSlice.reducer;
