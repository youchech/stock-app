import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct } from '../features/productSlice'

function ProductList() {
  const products = useSelector(state => state.products.items)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.ref}>
          <p>{p.type} - {p.color}</p>
          <p>Qty: {p.quantity} | Price: {p.price}</p>
          <button onClick={() => dispatch(deleteProduct(p.ref))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProductList