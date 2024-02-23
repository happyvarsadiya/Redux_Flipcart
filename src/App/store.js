import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './Reducer/CartSlice'

export const store = configureStore({
  reducer: {
    counter: CartSlice
  },
})