import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../features/productSlice'

function ProductForm() {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    ref: '',
    type: '',
    color: '',
    price: '',
    quantity: '',
    dateAjout: '',
    dateVente: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addProduct(form))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="ref" placeholder="Ref" onChange={handleChange} />
      <input name="type" placeholder="Type" onChange={handleChange} />
      <input name="color" placeholder="Color" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} />
      <input name="dateAjout" type="date" onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  )
}

export default ProductForm