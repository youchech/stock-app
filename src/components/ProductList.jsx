import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../features/productSlice'
import { useState } from 'react'
import ProductForm from './ProductForm'

function ProductList() {
  const products = useSelector(state => state.products.items)
  const dispatch = useDispatch()
  const [editProduct, setEditProduct] = useState(null)
  const [filters, setFilters] = useState({ type: '', color: '', minPrice: '', maxPrice: '' })

  const finishEdit = () => setEditProduct(null)

  const handleFilterChange = e => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  // Apply filters
  const filteredProducts = products.filter(p => {
    return (
      (filters.type === '' || p.type.toLowerCase().includes(filters.type.toLowerCase())) &&
      (filters.color === '' || p.color.toLowerCase().includes(filters.color.toLowerCase())) &&
      (filters.minPrice === '' || p.price >= parseFloat(filters.minPrice)) &&
      (filters.maxPrice === '' || p.price <= parseFloat(filters.maxPrice))
    )
  })

  return (
    <div className="flex flex-col items-center gap-5">
      {editProduct && (
        <div className="w-96 p-4 bg-yellow-100 border border-yellow-300 rounded mb-5">
          <h3 className="font-bold mb-2">Editing Product: {editProduct.ref}</h3>
          <ProductForm editProduct={editProduct} onFinishEdit={finishEdit} />
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-5 p-2 bg-gray-100 rounded shadow">
        <input
          name="type"
          placeholder="Filter by type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 w-36"
        />
        <input
          name="color"
          placeholder="Filter by color"
          value={filters.color}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 w-36"
        />
        <input
          name="minPrice"
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 w-24"
        />
      </div>

      <h2 className="text-xl font-semibold mb-3">Products</h2>
      {filteredProducts.length === 0 && <p>No products match the filter.</p>}

      {filteredProducts.map(p => (
        <div key={p.id} className="flex items-center gap-4 w-96 bg-white p-3 rounded shadow">
          {p.image && <img src={p.image} alt={p.type} className="w-20 h-20 object-cover rounded" />}
          <div className="flex-1">
            <p className="font-semibold">{p.type} - {p.color}</p>
            <p>Qty: {p.quantity} | Price: {p.price}</p>
            <p>Ref: {p.ref}</p>
            <p>Date Ajout: {p.dateAjout}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setEditProduct(p)}>Edit</button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => dispatch(deleteProduct(p.id))}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList