import SellerNavbar from "../../componants/SellerNavbar";

const SellerDashboard = () => {
  return (
    <div>
      <SellerNavbar />
      <div className="container w-100 mt-2 d-flex flex-row justify-content-between">
        <div className="left-section w-50">
          <div className="right w-100 mx-3">
            <h2 className="mt-3">Personal Information</h2>
            <div className="mb-3">
              <label className="form-label fw-medium">First Name</label>
              <input className="form-control" type="text" value="Sameer" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Last Name</label>
              <input className="form-control" type="text" value="Khatri" />
            </div>
          </div>
          <div className="left w-100 mx-3">
            <h2 className="mt-4">Shop Details</h2>
            <div className="mb-3">
              <label className="form-label fw-medium">Shop Name</label>
              <input className="form-control" type="text" value="Hello" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Shop Owner</label>
              <input
                className="form-control"
                type="text"
                value="Sameer Khatri"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Category</label>
              <select className="form-select" name="shop-category" id="">
                <option value="1">Fashion</option>
                <option value="2">Home Decor</option>
                <option value="3">Furniture</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Shop Address</label>
              <input className="form-control" type="text" value="Khajrana" />
            </div>
          </div>
        </div>
        <div className="right-section w-50 mx-5">
          <h2 className="mt-3">Contact Information</h2>
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input className="form-control" type="text" value="Khajrana" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Contact No.</label>
            <input className="form-control" type="text" value="9111045198" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Contact No. </label>
            <input className="form-control" type="text" value="04512368987" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Website Link</label>
            <input className="form-control" type="text" value="GoLocal.com" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
