import { useEffect, useState } from "react";
import Navbar from "../../componants/Navbar";
import { useDispatch } from "react-redux";
import { addSeller } from "../../redux/slices/SellerSlice";
import { useSelector } from "react-redux";

const SellerRegistration = () => {

  const dispatch = useDispatch();

  const seller = useSelector((state)=>state.seller.seller)


  const [sellerDetails,setSellerDetails]=useState({
    shopName:"",
    ownerName:"",
    category:"",
    email:"",
    contactNo:""

  })

  const handleChange=(e)=>{
    setSellerDetails({...sellerDetails,[e.target.name]:e.target.value})
    console.log(sellerDetails)
  }

  const handleSubmit=async()=>{
    try{
      const response = await fetch("http://localhost:8080/api/addSeller",{
        method:'POST',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(sellerDetails)
      });
      if(response.ok)
      {
        alert("seller registered sucessfully");
      }
      else{
        alert("Error Occured");
      }
    }catch(error)
    {
      console.log("Error : "+error);
    }
  }


  useEffect(()=>{
    handleSubmit();
  },[seller])

  return (
    <div>
      <Navbar />
      {/* Registration Page */}
      <div className=" w-50 m-auto my-5">
        <h3 className="my-4">
          <center>
            <span>Register Shop Now</span>
          </center>
        </h3>
        <h4 className="mb-">Shop Details</h4>
        <div className="mb-3">
          <label className="form-label fw-medium">Shop Name</label>
          <input
            type="text"
            className="form-control"
            id="shopName"
            name="shopName"
            value={sellerDetails.shopName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-medium">Owner Name</label>
          <input
            type="text"
            className="form-control"
            id="ownerName"
            name="ownerName"
            value={sellerDetails.ownerName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-medium">Category</label>
            <select
              className="form-select"
              name="category"
              id=""
              value={sellerDetails.category}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Home Furnishing">Home Furnishing</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Gift Item">Gift Item</option>
            </select>
        </div>

        <div className="w-100 mt-4">
          <h4 className="my-3">Personal Setails</h4>
          <div className="mb-3">
            <label className="form-label fw-medium">First Name</label>
            <input className="form-control" type="text" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Last Name</label>
            <input className="form-control" type="text" />
          </div>
        </div>

        <div className="right-section w-50">
          <h4 className="mt-3">Contact Information</h4>
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={sellerDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Contact No.</label>
            <input
              className="form-control"
              type="text"
              name="contactNo"
              value={sellerDetails.contactNo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Contact No. </label>
            <input className="form-control" type="text" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Website Link</label>
            <input className="form-control" type="text" />
          </div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>dispatch(addSeller(sellerDetails))} >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SellerRegistration
