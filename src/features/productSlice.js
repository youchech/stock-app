import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [] },
  reducers: {
    addProduct: (state, action) => {
      const timestamp = Date.now()
      state.items.push({
        id: timestamp,
        ref: `JB-${timestamp}`,
        dateAjout: new Date().toISOString().split('T')[0],
        ...action.payload
      })
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload)
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
    }
  }
})

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions
export default productSlice.reducer