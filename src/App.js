import logo from './logo.svg';
import './App.css';
import Home from './Componet/Home';
import About from './Componet/About';
import { Routes, Route } from "react-router-dom"
import Cart from './Componet/Cart';


function App() {
  return (
    <div className="App">

        {/* <Home></Home> */}
        {/* <About></About> */}

        <Routes>
        <Route path="/" element={ <Home></Home> } />
        <Route path="About/:id" element={ <About></About> } />
        <Route path='/cart' element={<Cart></Cart>}></Route>
      </Routes>

    </div>
  );
}

export default App;
