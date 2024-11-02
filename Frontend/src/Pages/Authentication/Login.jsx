import Navbar from "../../componants/Navbar";

const Login = () => {
  return (
    <div>
      <Navbar />

      {/*Login Page */}
      <div className="form w-50 m-auto my-5 h-100">
        <h3 className="my-3">
          <span>Login Now</span>
        </h3>
        <form>
          <div className="mb-3">
            <label className="form-label fw-medium">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
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
