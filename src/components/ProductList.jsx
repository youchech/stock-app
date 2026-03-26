import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../features/productSlice'
import { useState } from 'react'
import ProductForm from './ProductForm'

function ProductList() {
  const products = useSelector(state => state.products.items)
  const dispatch = useDispatch()
  const [editProduct, setEditProduct] = useState(null)

  const finishEdit = () => setEditProduct(null)

  return (
    <div className="flex flex-col items-center gap-5">
      {editProduct && (
        <div className="w-96 p-4 bg-yellow-100 border border-yellow-300 rounded mb-5">
          <h3 className="font-bold mb-2">Editing Product: {editProduct.ref}</h3>
          <ProductForm editProduct={editProduct} onFinishEdit={finishEdit} />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-3">Products</h2>
      {products.length === 0 && <p>No products yet.</p>}

      {products.map(p => (
        <div key={p.id} className="flex items-center gap-4 w-96 bg-white p-3 rounded shadow">
          {p.image && <img src={p.image} alt={p.type} className="w-20 h-20 object-cover rounded" />}
          <div className="flex-1">
            <p className="font-semibold">{p.type} - {p.color}</p>
            <p>Qty: {p.quantity} | Price: {p.price}</p>
            <p>Ref: {p.ref}</p>
            <p>Date Ajout: {p.dateAjout} | Date Vente: {p.dateVente || '-'}</p>
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