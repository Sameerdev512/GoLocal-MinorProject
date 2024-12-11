// It is the seller page that will show all listed products to the seller not visible for customer

import Navbar2 from "../../componants/SellerNavbar"
import MyShopItem from "./MyShopItem";
import { useSelector } from "react-redux";

const MyShopListedProducts = () => {
  return (
    <div>
      <Navbar2 />
      <div className="text-center mt-3"><h3>Shop Name</h3></div>
      <h3 className="mt-4 mx-3">
          Listed Products
          </h3>
      <div className="container-cu w-100 row row-cols-sm-2 row-cols-md-4 row-cols-lg-6 gap-5 mx-3 mx-auto d-flex justify-content-start">
          <MyShopItem />
          <MyShopItem />
          <MyShopItem />
          <MyShopItem />
          <MyShopItem />
          <MyShopItem />
          <MyShopItem />
      </div>
    </div>
  );
}

export default MyShopListedProducts
