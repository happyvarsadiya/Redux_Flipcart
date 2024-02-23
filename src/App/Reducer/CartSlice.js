import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const CartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    cartdata: (state, action) => {
        action.payload.qut=0;
        action.payload.qut1=0;
        state.value.push(action.payload);
    },

    increment: (state,action) => {
      const item = state.value.find(item => item.id === action.payload.id);
      if(item)
      {
        item.qut++;
      }
    },
    decrement: (state,action) => {
      const item = state.value.find(item => item.id === action.payload.id);
      if(item && item.qut > 0)
      {
        item.qut--;
      }
    },
    removeItem: (state, action) => {
      state.value = state.value.filter(item => item.id !== action.payload.id);
    },
    incrementcart: (state,item) => {
      state.item+=1;
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment,decrement, cartdata,removeItem,incrementcart } = CartSlice.actions

export default CartSlice.reducer