import './App.css'
import ProductCard from './components/productCard'
import SuperProduct from './components/superProduct'

function App() {

  return (
    <>
      <div className='w-full h-screen bg-blue-100'>
        <div className='w-[600px] h-[600px] bg-black flex flex-col  items-center justify-evenly' >
        <div className='w-[75px] h-[75px] bg-yellow-500'></div>
          <div className='w-[75px] h-[75px] bg-red-900'></div>
            <div className='w-[75px] h-[75px] bg-green-600'></div>
            <div className='w-[75px] h-[75px] bg-purple-600'></div>
            <div className='w-[75px] h-[75px] bg-pink-600'></div>
            <div className='w-[75px] h-[75px] bg-gray-600'></div>
            <div className='w-[75px] h-[75px] bg-orange-600'></div>
          </div>
      </div>
    </>
  )   
}

export default App
