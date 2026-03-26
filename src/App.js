import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5">Stock - Jewelry Boxes</h1>
      <ProductForm />
      <ProductList />
    </div>
  )
}

export default App