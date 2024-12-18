// validaion is remaining
import Navbar from "../../componants/Navbar";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";

const SignUp = () => {

  //for navigation
  const navigate = useNavigate();

  //control display of otp verification section
  const [otpInputDisplay, setOtpInputDisplay] = useState("none");
  const [otpStatusDisplay, setOtpStatusDisplay] = useState("none");
  // const [submitBtnDisable, setSubmitBtnDisable] = useState(true);
  const [generateBtnDisable, setGenerateBtnDisable] = useState(false);
  const [generateBtnDisplay, setGenerateBtnDisplay] = useState("block");
  const [otpVertificationDetails, setOtpVerificationDetails] = useState({
    otp: "",
  });
  const [emailMsgDisplay,setEmailMsgDisplay] = useState("block")
  const [isOtpVerified,setIsOtpVerfied] = useState(false)
  const [userExistsMsg, setUserExistsMsg] = useState(
    "We'll never share your email with anyone else."
  );

  //deatils of customer for signup
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [display, setDisplay] = useState("none");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordDisplay, setPasswordDisplay] = useState("none");
  const [emailErr, setEmailErr] = useState("");
  const [otpErr, setOtpErr] = useState("");

  const emailValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(customerDetails.email)) {
      setEmailErr("Enter valid email");
      return 0;
    }
    setEmailErr("");
    return 1;
  };

    const handleOtpInputDisplay = () => {
      if (emailValidation(customerDetails.email)) {
        setOtpInputDisplay("block");
      }
    };

  const handleOtpInput = (e) => {
    setOtpVerificationDetails({
      ...otpVertificationDetails,
      otp: e.target.value,
    });
    console.log(otpVertificationDetails.otp);
    const value = e.target.value;
    const numberPattern = /^\d{6}$/;
    if (!numberPattern.test(value)) {
      setOtpErr("Invalid otp");
      return 0;
    } else {
      // const sanitizedValue = value.replace(/\D/g, "").slice(0, 10); used to clean string give only digits not dcharacter and other
      if (value.length === 6) {
        setOtpErr("");
      } else {
        setOtpErr("Invalid otp");
      }
    }
  };

  //Navigation of child signup pages
  const handleNavigate = () => {
    setDisplay(
      display == "none" ? "block" : display == "block" ? "none" : "block"
    );
  };

  //Toggle display of passwordeye icon to hide and show
  const handlePasswordDisplay = () => {
    const passwordInput = document.getElementById("exampleInputPassword");
    if (passwordDisplay == "none") {
      passwordInput.type = "text";
      setPasswordDisplay("block");
    } else {
      passwordInput.type = "password";
      setPasswordDisplay("none");
    }
  };

  const handleChange = (e) => {
    //handle change of input fields
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
    console.log(customerDetails)
  };

  // Check if all fields are filled
  const validation = () => {
    if (customerDetails.firstName == "") {
      return 0;
    } else if (customerDetails.password != customerDetails.confirmPassword) {
      setPasswordErr("Password not matched");
      return 0;
    }
    return 1;
  };

  const handleGenerateOtp = async () => {
    //while generating otp verifird button must be none
    setOtpStatusDisplay("none");
    if (!emailValidation(customerDetails.email)) {
      setEmailErr("Enter valid email");
    } else {
      //after clicking once on generate otp it must be disabled
      setGenerateBtnDisable(true);
      //send post request to backed to generate otp
      try {
        const response = await fetch("http://localhost:8080/otp/sendOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: `${customerDetails.email}` }),
        });

        const result = await response.json();
        console.log(result);

        if (response.ok && result.userExists==false) {
          alert("otp generated successfully");
          handleOtpInputDisplay();
          setEmailMsgDisplay("none")
        } else {
          alert("User already exists");
          setUserExistsMsg("User with email already exists")
          navigate("/SignUp")
          setGenerateBtnDisable(false)
        }
      } catch (error) {
        console.log("Error : " + error);
      }
    }
  };

  const handleOtpVerification = async () => {
    //send post request to backed tovalidate otp
    try {
      const response = await fetch("http://localhost:8080/otp/validateOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: customerDetails.email,
          otp: otpVertificationDetails.otp,
        }),
      });

      // Parse the response body
      const result = await response.json();
      console.log(result);

      if (response.ok && result.otpValid == true) {
        setIsOtpVerfied(true);
        setOtpInputDisplay("none");
        setOtpStatusDisplay("block");
        alert("otp validated successfully");
        setGenerateBtnDisable(false);
        setGenerateBtnDisplay("none");
      } else {
        setOtpErr("Enter valid otp");
        alert("Invalid Otp");
      }
    } catch (error) {
      console.log("Error : " + error);
    }
  };


  const handleSubmit = async () => {
    //to prevent rendering when password not matched
    event.preventDefault();

    //alert otp verification required if submit is clicked without otp verification
    if(!isOtpVerified)
    {
      alert("Otp verification required");
    }
    //call validation
    if (validation() && isOtpVerified) {
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
          navigate("/login")
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
            <div className="mb-3 d-flex flex-column w-100">
              <div>
                <label className="form-label fw-medium">Email address</label>
              </div>
              <div className="d-flex">
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

                <button
                  className={`btn btn-primary w-25 mx-2 ${
                    generateBtnDisable ? "disabled" : ""
                  }
                d-${generateBtnDisplay}`}
                  onClick={handleGenerateOtp}
                >
                  Generate otp
                </button>
                <button
                  className={`btn btn-success d-${otpStatusDisplay} mx-2`}
                >
                  verfied
                </button>
              </div>
            </div>
            <div id="emailHelp" className={`form-text d-${emailMsgDisplay}`}>
              {userExistsMsg}
            </div>
            <div className={`d-flex align-items-center w-50 `}>
              <div
                className={`d-${otpInputDisplay} d-flex justify-content-start align-items-center`}
              >
                <input
                  className="form-control w-50"
                  type="text"
                  name="otp"
                  placeholder="Enter otp here"
                  value={otpVertificationDetails.otp}
                  onChange={handleOtpInput}
                />
                <button
                  className="btn btn-success mx-2"
                  onClick={handleOtpVerification}
                >
                  Verify
                </button>
              </div>
            </div>
            <p style={{ color: "red" }}>{otpErr}</p>
            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <div className="d-flex align-items-center">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword"
                  name="password"
                  value={customerDetails.password}
                  onChange={handleChange}
                  required
                />
                <span
                  style={{
                    marginLeft: "-30px",
                    display: passwordDisplay == "block" ? "block" : "none",
                  }}
                  onClick={handlePasswordDisplay}
                >
                  <FaEye />
                </span>
                <span
                  style={{
                    marginLeft: "-30px",
                    display: passwordDisplay == "block" ? "none" : "block",
                  }}
                  onClick={handlePasswordDisplay}
                >
                  <FaEyeSlash />
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputCnfPassword"
                name="confirmPassword"
                value={customerDetails.confirmPassword}
                onChange={handleChange}
                required
              />
              <p style={{ color: "red" }}>{passwordErr}</p>
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
              style={{ marginRight: "40vw" }}
            >
              Back
            </button>
            <button type="submit" className={`btn btn-primary `}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
