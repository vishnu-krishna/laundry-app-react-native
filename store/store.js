import { configureStore } from '@reduxjs/toolkit';
// import CartReducer from "./CartReducer";
import ProductReducer from './ProductReducer';
import CartReducer from './CartReducer';

export default configureStore({
    reducer: {
        cart: CartReducer,
        product: ProductReducer,
    },
});