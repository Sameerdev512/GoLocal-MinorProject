import Navbar from "../../componants/Navbar";
import LocalShopItem from "../Seller/MyShopItem";

const LocalShop = () => {
  return (
    <div>
      <Navbar />
      <div className="shop-details-conatainer mt-3  w-100 m-auto h-50 d-flex ">
        <div className="shop-images px-3 border-end border-2 border-secondry w-50">
          
        </div>
        <div className="shop-deatils w-50 mt-2 px-5 d-flex flex-column align-items-start justify-content-start h-100 ">
          <div className="shop-name fw-normal mb-2">
            <h2>Khatri Steel Furniture</h2>
          </div>
          <div className="owner-name fw-normal mb-2">
            <span>
              Owner : <span className="fw-medium fs-5">Virendra Khatri</span>
            </span>
          </div>
          <div className="shop-category fw-normal mb-2">
            Category : <span className="fw-normal fs-6">Home Furniture</span>
          </div>
          <div className="shop-address fw-normal mb-2">
            Address :{" "}
            <span className="fw-normal fs-6">
              59/3 Shiv bagh colony (badi) khajrana Indore M.p.
            </span>
          </div>
          <div className="contact-number fw-normal mb-2">
            Contact No. : <span className="fw-normal fs-6">91110010101</span>
          </div>
        </div>
      </div>
      <hr></hr>

        <div className="text-center fs-3 my-4 fw-medium">Available Products</div>
      <div className="shop-item-container m-auto w-100 row row-cols-sm-2 row-cols-md-4 row-cols-lg-6 gap-5 mx-3 mx-auto d-flex justify-content-start">
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
        <LocalShopItem/>
      </div>
    </div>
  );
};

export default LocalShop;
