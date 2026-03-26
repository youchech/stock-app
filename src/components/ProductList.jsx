import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, deleteProductAPI } from '../features/productSlice'
import ProductForm from './ProductForm'
import { formatDate } from '../utils/formatDate'

function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.items)
  const [editProduct, setEditProduct] = useState(null)
  const [filters, setFilters] = useState({ type: '', color: '' })

  useEffect(() => { dispatch(fetchProducts()) }, [dispatch])

  const filtered = products.filter(p =>
    (filters.type === '' || p.type.toLowerCase().includes(filters.type.toLowerCase())) &&
    (filters.color === '' || p.color.toLowerCase().includes(filters.color.toLowerCase()))
  )

  return (
    <div className="p-6 space-y-6">
      {editProduct && <ProductForm editProduct={editProduct} onFinishEdit={() => setEditProduct(null)} />}

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Filter by Type"
          className="border rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setFilters({ ...filters, type: e.target.value })}
        />
        <input
          placeholder="Filter by Color"
          className="border rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setFilters({ ...filters, color: e.target.value })}
        />
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
            {p.image && <img src={`http://localhost:5000${p.image}`} alt="" className="w-32 h-32 object-cover rounded mb-3" />}
            <div className="text-center">
              <p className="font-semibold text-lg">{p.type}</p>
              <p className="text-gray-500 mb-1">{p.color}</p>
              <p className="mb-1">Ref: <span className="font-medium">{p.ref}</span></p>
              <p className="mb-1">Qty: {p.quantity} | Price: {p.price}</p>
              <p className="text-gray-400 text-sm">{formatDate(p.dateAjout)}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                onClick={() => setEditProduct(p)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => dispatch(deleteProductAPI(p.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList