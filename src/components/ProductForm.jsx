import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, updateProduct } from '../features/productSlice'

function ProductForm({ editProduct, onFinishEdit }) {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    type: '',
    color: '',
    price: '',
    quantity: '',
    dateVente: '',
    image: null
  })

  useEffect(() => {
    if (editProduct) setForm(editProduct)
  }, [editProduct])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImage = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => setForm({ ...form, image: reader.result })
    if (file) reader.readAsDataURL(file)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.type || !form.color || !form.price || !form.quantity || !form.image) return alert("Fill all fields")
    
    if (editProduct) {
      dispatch(updateProduct(form))
      onFinishEdit()
    } else {
      dispatch(addProduct(form))
    }

    setForm({ type: '', color: '', price: '', quantity: '', dateVente: '', image: null })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 justify-center mb-5 p-4 bg-white rounded-lg shadow-md">
      <input name="type" placeholder="Type" value={form.type} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1 w-36" />
      <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1 w-36" />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1 w-24" />
      <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1 w-24" />
      <input name="dateVente" type="date" value={form.dateVente} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1" />
      <input type="file" accept="image/*" onChange={handleImage} className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto" />
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        {editProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  )
}

export default ProductForm