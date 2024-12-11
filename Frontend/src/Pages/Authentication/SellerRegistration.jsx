import { useEffect, useState } from "react";
import Navbar from "../../componants/Navbar";
import { useDispatch } from "react-redux";
import { addSeller } from "../../redux/slices/SellerSlice";
import { useSelector } from "react-redux";

const SellerRegistration = () => {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.seller.seller);
  const [sellerDetails, setSellerDetails] = useState({
    shopName: "",
    ownerName: "",
    category: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    websiteLink: "",
  });
  const [contactErr, setContactErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const emailValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(sellerDetails.email)) {
      setEmailErr("Enter valid email");
      return 0;
    }
    setEmailErr("");
    return 1;
  };

  const contactNumberValidation = (e) => 
    {
    setSellerDetails({
      ...sellerDetails,
      contactNo: e.target.value,
    });
    const value = e.target.value;
    const numberPattern = /^\d{10}$/;
    if (!numberPattern.test(value)) {
      setContactErr("Invalid number");
      return 0;
    } else {
      // const sanitizedValue = value.replace(/\D/g, "").slice(0, 10); used to clean string give only digits not dcharacter and other
      if (value.length === 10) {
        setContactErr("");
      } else {
        setContactErr("Invalid number");
      }
    }
  };

  const validation = () => {
    if (
      sellerDetails.shopName == "" ||
      sellerDetails.category == "" ||
      sellerDetails.ownerName == ""||
      sellerDetails.firstName == ""
    ) {
      return 0;
    }
    return 1;
  };

  //handling input changes
  const handleChange = (e) => {
    setSellerDetails({ ...sellerDetails, [e.target.name]: e.target.value });
    console.log(sellerDetails);
  }

  const handleSubmit = async () => {
    // Check if all fields are filled
    if (!validation()) {
      alert("Please fill in all required fields.");
    } else {
      //send data to backend
      try {
        const response = await fetch("http://localhost:8080/api/addSeller", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sellerDetails),
        });
        if (response.ok) {
          alert("seller registered sucessfully");
        } else {
          alert("Error Occured");
        }
      } catch (error) {
        console.log("Error : " + error);
      }
    }
  };

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
            <input
              className="form-control"
              name="firstName"
              type="text"
              value={sellerDetails.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              value={sellerDetails.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="right-section w-50">
          <h4 className="mt-3">Contact Information</h4>
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <div className="d-flex align-items-center w-100">
              <input
                className="form-control"
                type="email"
                name="email"
                value={sellerDetails.email}
                onChange={(e)=>{handleChange(e),emailValidation(e)}}
              />
              <span style={{ marginLeft: "-50px" }}>Verify</span>
            </div>
            <p style={{ color: "red" }}>{emailErr}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Contact No.</label>
            <input
              className="form-control"
              type="text"
              name="contactNo"
              value={sellerDetails.contactNo}
              onChange={contactNumberValidation}
            />
            <p style={{ color: "red" }}>{contactErr}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Website Link</label>
            <input
              className="form-control"
              type="text"
              name="websiteLink"
              value={sellerDetails.websiteLink}
              onChange={handleChange}
            />
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
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            dispatch(addSeller(sellerDetails));
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SellerRegistration;
