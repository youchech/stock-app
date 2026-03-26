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
    dateAjout: '',
    image: '',       
    imageFile: null  
  })

  // Auto-fill form when editing
   useEffect(() => {
   if (editProduct) {
      setForm({
         id: editProduct.id,
         type: editProduct.type || '',
         color: editProduct.color || '',
         price: editProduct.price || '',
         quantity: editProduct.quantity || '',
         dateAjout: editProduct.dateAjout
         ? editProduct.dateAjout.split('T')[0]
         : '',
         image: editProduct.image || '',
         imageFile: null
      })
   }
   }, [editProduct])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImage = e => {
    setForm({ ...form, imageFile: e.target.files[0] })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('id', form.id)
    formData.append('type', form.type)
    formData.append('color', form.color)
    formData.append('price', form.price)
    formData.append('quantity', form.quantity)
    formData.append('dateAjout', form.dateAjout)

    // If new file uploaded use it
    if (form.imageFile) {
      formData.append('image', form.imageFile)
    } 
    // Otherwise keep old image
    else if (form.image) {
      formData.append('image', form.image)
    }

    if (editProduct) {
      formData.append('ref', editProduct.ref)
      dispatch(updateProductAPI(formData))
      onFinishEdit()
    } else {
      dispatch(addProductAPI(formData))
    }

    // reset form
    setForm({
      id: null,
      type: '',
      color: '',
      price: '',
      quantity: '',
      dateAjout: '',
      image: '',
      imageFile: null
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 p-4 bg-white rounded shadow">

      <input
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Type"
        className="border p-1"
      />

      <input
        name="color"
        value={form.color}
        onChange={handleChange}
        placeholder="Color"
        className="border p-1"
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-1"
      />

      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="border p-1"
      />

      <input
         name="dateAjout"
         type="date"
         value={form.dateAjout || ''}
         onChange={handleChange}
      />

      {/* Show current image */}
      {form.image && !form.imageFile && (
        <img
          src={`http://localhost:5000${form.image}`}
          alt=""
          className="w-20 h-20 object-cover rounded"
        />
      )}

      <input type="file" onChange={handleImage} />

      <button className="bg-green-500 text-white px-3 py-1 rounded">
        {editProduct ? 'Update' : 'Add'}
      </button>
    </form>
  )
}

export default ProductForm