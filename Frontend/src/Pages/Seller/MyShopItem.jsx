
const MyShopItem = () => {
  return (
    <div>
      <div className="card d-flex p-1 my-3" style={{ width: "240px" ,backgroundColor:'lightcyan'}}>
        <img
          src="https://veirdo.in/cdn/shop/files/b_0119493a-9927-4550-8323-baefe5f625c0.jpg?v=1724147309"
          className="card-img-top"
          alt="..."
          style={{height:'200px'}}
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text ">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-success">
            Edit Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default MyShopItem
