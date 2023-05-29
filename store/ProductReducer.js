import { createSlice } from '@reduxjs/toolkit';

const test = [
    {
        'id': '3re5FdKhtOa9Jd1QSHkt',
        'image': 'https://img.icons8.com/color/48/sweater.png',
        'name': 'sweater',
        'price': '10',
        'quantity': '0',
    },
    {
        'id': '6fn0VBZEjwpBJybJpAkc',
        'image': 'https://cdn-icons-png.flaticon.com/128/892/892458.png',
        'name': 'T-Shirt',
        'price': '10',
        'quantity': '0',
    },
    {
        'id': 'CnQcONANVLFoLDfSYCFc',
        'image': 'https://cdn-icons-png.flaticon.com/128/293/293241.png',
        'name': 'sleveless',
        'price': '10',
        'quantity': '0',
    },
    {
        'id': 'JbtegezsBeQnmuVA3JQq',
        'image': 'https://cdn-icons-png.flaticon.com/128/9609/9609161.png',
        'name': 'dresses',
        'price': '10',
        'quantity': '0',
    },
    {
        'id': 'R0AL5q3y3gr3HQQbskLs',
        'image': 'https://cdn-icons-png.flaticon.com/128/3345/3345397.png',
        'name': 'shorts',
        'price': '10',
        'quantity': '0',
    },
    {
        'id': 'sp1vJRsq0zNDmIdjzwMp',
        'image': 'https://cdn-icons-png.flaticon.com/128/599/599388.png',
        'name': 'jeans',
        'price': '10',
        'quantity': '0',
    },
    {
        'id': 'wMTELGGJtzizE3hAKtLS',
        'image': 'https://cdn-icons-png.flaticon.com/128/4643/4643574.png',
        'name': 'shirt',
        'price': '10',
        'quantity': '0',
    } ]
;
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
    },
    reducers: {
        getProducts: (state, action) => {
            state.product = [ ...action.payload ];
        },
        incrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => {
                return item.id === action.payload.id;
            });
            itemPresent.quantity++;
        },
        decrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            if (itemPresent.quantity === 1) {
                itemPresent.quantity = 0;
                state.cart = state.product.filter((item) => item.id !== action.payload.id);
            } else {
                itemPresent.quantity--;
            }
        },
    },
});

export const { getProducts, incrementQty, decrementQty } = productSlice.actions;

export default productSlice.reducer;