import Navbar from "../../componants/Navbar";

const SignUp = () => {
  return (
    <div>
      <Navbar />

      {/* Signup Page */}
      <div className="form w-50 m-auto my-5">
        <h3 className="my-4">
          <span>SignUp Now</span>
        </h3>
        <form>
          <div className="mb-3">
            <label className="form-label fw-medium">First Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputFirstName"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLastName"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
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
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputCnfPassword1"
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

export default SignUp
