import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload)
    },

    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.ref !== action.payload)
    },
  },
})

export const { addProduct, deleteProduct } = productSlice.actions
export default productSlice.reducer