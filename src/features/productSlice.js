import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api/products'

// GET
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get(API)
  return res.data
})

// ADD
export const addProductAPI = createAsyncThunk('products/add', async (formData) => {
  const res = await axios.post(API, formData)
  return res.data
})

// UPDATE
export const updateProductAPI = createAsyncThunk('products/update', async (formData) => {
  const res = await axios.put(`${API}/${formData.get('id')}`, formData)
  return res.data
})

// DELETE
export const deleteProductAPI = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${API}/${id}`)
  return id
})

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [] },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(addProductAPI.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateProductAPI.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(deleteProductAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  }
})

export default productSlice.reducer