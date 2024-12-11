import Login from '../Pages/Authentication/Login'
import SignUp from '../Pages/Authentication/SignUp'
import Dashboard from '../Pages/FrontPage-UI/Dashboard'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SellerRegistration from '../Pages/Authentication/SellerRegistration';
import About from '../componants/About';
import SellerDashboard from '../Pages/Seller/SellerDashboard';
import MyShopListedProducts from '../Pages/Seller/MyShopListedProducts';

function App() {

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/SignUp" element={<SignUp/>}></Route>
      <Route path="/About" element={<About/>}></Route>
      <Route path="/MyShopProducts" element={<MyShopListedProducts/>}></Route>
      <Route path="/SellerProfile" element={<SellerDashboard/>}></Route>
      <Route path="/Registration" element={<SellerRegistration/>}></Route>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
