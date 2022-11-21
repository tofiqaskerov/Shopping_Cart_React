
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header/Header.jsx'
import './App.css';
import Routers from './Routes/Routers';
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css'



function App() {
  return (
    <BrowserRouter>
       <ToastContainer/>
        <Header/>
        <Routers/>
     
    </BrowserRouter>
   
  );
}

export default App;
