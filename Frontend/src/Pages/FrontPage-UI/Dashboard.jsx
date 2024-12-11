//It is the design of the shop containing full listing products that is enabled by clicking the listed shop(in card form) on dashboard

import Navbar from "../../componants/Navbar";
import AddProducts from "../Seller/AddProducts";
import LocalShop from "./LocalShop";

import SellerDashboard from "../Seller/SellerDashboard";

const Dashboard = () => {
  return (
    <div>
      <Navbar login="Login" signup="SignUp" active=""/>
      <h2 className="mx-auto my-3">HomePage</h2>
      {/* <LocalShop/> */}
      {/* <AddProducts/> */}
      {/* <SellerDashboard/> */}
    </div>
  );
}

export default Dashboard
