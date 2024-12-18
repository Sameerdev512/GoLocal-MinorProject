import Navbar from "../../componants/Navbar";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";


const Login = () => {

  //for navigation to other pages
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "sameer.khatri2022@sait.ac.in",
    password: "Sameerkhatri@2004",
  });
  const [passwordDisplay,setPasswordDisplay] = useState("none")
  const [invalidPasswdErr,setInvalidPasswdErr]=useState("")
  const [loginOrlogout,setLoginOrLogout] = useState("Login")

  const emailValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(loginDetails.email)) {
      return 0;
    }
    return 1;
  };

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    console.log(loginDetails);
  };
  //Toggle display of passwordeye icon to hide and show
  const handlePasswordDisplay = () => {
    const passwordInput = document.getElementById("loginInputPassword");
    if (passwordDisplay == "none") {
      passwordInput.type = "text";
      setPasswordDisplay("block");
    } else {
      passwordInput.type = "password";
      setPasswordDisplay("none");
    }
  };

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${loginDetails.email}`,
          password: `${loginDetails.password}`,
        }),
      });

      // Parse the response body
      const result = await response.json();
      console.log(result);

      if (response.ok && result.loginSuccessful) {
        setInvalidPasswdErr("")
        setTimeout(() => {
          alert("Login verified");
          navigate("/");
          setLoginOrLogout("Logout")
        }, 100); 
      } else {
        setInvalidPasswdErr("Invalid Password")
      }
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  return (
    <div>
      <Navbar loginOrlogout={loginOrlogout}/>

      {/*Login Page */}
      <div className="form w-50 m-auto my-5 h-100">
        <h3 className="my-3">
          <span>Login Now</span>
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Email address</label>
            <input
              type="email"
              name="email"
              value={loginDetails.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Password</label>
            <div className="d-flex align-items-center">
              <input
                type="password"
                name="password"
                id="loginInputPassword"
                value={loginDetails.password}
                className="form-control"
                onChange={handleChange}
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
          <div>
            <p style={{ color: "red" }}>{invalidPasswdErr}</p>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login
