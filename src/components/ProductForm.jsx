import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addProductAPI, updateProductAPI } from '../features/productSlice'

function ProductForm({ editProduct, onFinishEdit }) {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    id: null,
    type: '',
    color: '',
    price: '',
    quantity: '',
    dateVente: '',
    image: '',
    imageFile: null
  })

  useEffect(() => {
    if (editProduct) {
      setForm({
        id: editProduct.id,
        type: editProduct.type || '',
        color: editProduct.color || '',
        price: editProduct.price || '',
        quantity: editProduct.quantity || '',
        dateVente: editProduct.dateVente ? editProduct.dateVente.split('T')[0] : '',
        image: editProduct.image || '',
        imageFile: null
      })
    }
  }, [editProduct])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleImage = e => setForm({ ...form, imageFile: e.target.files[0] })

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('id', form.id)
    formData.append('type', form.type)
    formData.append('color', form.color)
    formData.append('price', form.price)
    formData.append('quantity', form.quantity)
    formData.append('dateVente', form.dateVente)
    if (editProduct) formData.append('ref', editProduct.ref)
    if (form.imageFile) formData.append('image', form.imageFile)
    else if (form.image) formData.append('image', form.image)

    if (editProduct) {
      dispatch(updateProductAPI(formData))
      onFinishEdit()
    } else {
      dispatch(addProductAPI(formData))
    }

    setForm({ id: null, type: '', color: '', price: '', quantity: '', dateVente: '', image: '', imageFile: null })
  }

  return (
    <div className="max-w-xl w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label className="font-medium">Type</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="type"
            value={form.type || ''}
            onChange={handleChange}
            placeholder="Jewelry Box Type"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Color</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="color"
            value={form.color || ''}
            onChange={handleChange}
            placeholder="Color"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Price</label>
          <input
            type="number"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="price"
            value={form.price || ''}
            onChange={handleChange}
            placeholder="Price"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Quantity</label>
          <input
            type="number"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="quantity"
            value={form.quantity || ''}
            onChange={handleChange}
            placeholder="Quantity"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="dateVente"
            value={form.dateVente || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Image</label>
          {form.image && !form.imageFile && (
            <img
              src={`http://localhost:5000${form.image}`}
              alt=""
              className="w-32 h-32 object-cover rounded mb-2"
            />
          )}
          <input type="file" onChange={handleImage} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editProduct ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default ProductForm