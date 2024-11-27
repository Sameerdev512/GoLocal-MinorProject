// validaion is remaining

import Navbar from "../../componants/Navbar";
import { useState } from "react";

const SignUp = () => {
  const [display, setDisplay] = useState("none");
  const[passwordErr,setPasswordErr]=useState("");

  //Navigation of child signup pages
  const handleNavigate = () => {
    setDisplay(
      display == "none" ? "block" : display == "block" ? "none" : "block"
    );
  };

  //deatils of customer for signup
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword:""
  });

  const handleChange = (e) => {
    //handle change of input fields
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  // Check if all fields are filled
  const validation =()=>{
    if(customerDetails.firstName=="")
    {
      return 0;
    }
    else if(customerDetails.password!=customerDetails.confirmPassword)
    {
      setPasswordErr("Password not matched")
      return 0;
    }
    return 1;
  }

  const handleSubmit = async () => {
    //to prevent rendering when password not matched
    event.preventDefault()
    //call validation
    if(validation())
    {
    //send data to backend
    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerDetails),
      });
      if (response.ok) {
        alert("Customer registered sucessfully");
      } else {
        alert("Error Occured");
      }
    } catch (error) {
      console.log("Error : " + error);
    }
  }
  };

  //required field will work on onSubmit in form that rund browser inbuilt validation logic

  return (
    <div>
      <Navbar />

      {/* Signup Page */}
      <div className="form w-50 m-auto my-5">
        <h3 className="my-4">
          <span>SignUp Now</span>
        </h3>
        <form onSubmit={handleSubmit}> 
          {/* Part1 */}
          <div
            className="part1"
            style={{ display: display == "block" ? "none" : "block" }}
          >
            <div className="mb-3">
              <label className="form-label fw-medium">First Name*</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUserFirstName"
                name="firstName"
                value={customerDetails.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUserLastName"
                name="lastName"
                value={customerDetails.lastName}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary" onClick={handleNavigate}>
              Next
            </button>
          </div>

          {/* Part2 */}
          <div className="part2" style={{ display: display }}>
            <div className="mb-3">
              <label className="form-label fw-medium">Username</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUserName"
                name="userName"
                value={customerDetails.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                value={customerDetails.email}
                onChange={handleChange}
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={customerDetails.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputCnfPassword1"
                name="confirmPassword"
                value={customerDetails.confirmPassword}
                onChange={handleChange}
                required
              />
              <p style={{color:"red"}}>{passwordErr}</p>
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
              className="btn btn-primary"
              onClick={handleNavigate}
              style={{ marginRight: "41vw" }}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
