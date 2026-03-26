import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchProducts, deleteProductAPI } from '../features/productSlice'
import ProductForm from './ProductForm'
import { formatDate } from '../utils/formatDate'

function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.items)

  const [editProduct, setEditProduct] = useState(null)
  const [filters, setFilters] = useState({
    type: '',
    color: '',
    minPrice: '',
    maxPrice: ''
  })

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const filteredProducts = products.filter(p =>
    (filters.type === '' || p.type.toLowerCase().includes(filters.type.toLowerCase())) &&
    (filters.color === '' || p.color.toLowerCase().includes(filters.color.toLowerCase())) &&
    (filters.minPrice === '' || p.price >= parseFloat(filters.minPrice)) &&
    (filters.maxPrice === '' || p.price <= parseFloat(filters.maxPrice))
  )

  return (
    <div className="flex flex-col items-center gap-5">

      {/* EDIT FORM */}
      {editProduct && (
        <div className="w-96 p-4 bg-yellow-100 border rounded">
          <h3 className="font-bold mb-2">Editing: {editProduct.ref}</h3>
          <ProductForm editProduct={editProduct} onFinishEdit={() => setEditProduct(null)} />
        </div>
      )}

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-3 rounded shadow">
        <input
          name="type"
          placeholder="Type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />

        <input
          name="color"
          placeholder="Color"
          value={filters.color}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        />

        <input
          name="minPrice"
          type="number"
          placeholder="Min"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1 w-20"
        />

        <input
          name="maxPrice"
          type="number"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1 w-20"
        />
      </div>

      <h2 className="text-xl font-bold">Products</h2>

      {filteredProducts.length === 0 && <p>No products found</p>}

      {filteredProducts.map(p => (
        <div key={p.id} className="flex gap-4 w-96 bg-white p-3 rounded shadow">

          {p.image && (
            <img src={`http://localhost:5000${p.image}`} alt="" className="w-20 h-20 object-cover rounded" />
          )}

          <div className="flex-1">
            <p className="font-semibold">{p.type} - {p.color}</p>
            <p>Qty: {p.quantity} | Price: {p.price}</p>
            <p>Ref: {p.ref}</p>
            <p>{formatDate(p.dateAjout)}</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setEditProduct(p)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => dispatch(deleteProductAPI(p.id))}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>

        </div>
      ))}

    </div>
  )
}

export default ProductList