
const MyShopItem = () => {
  return (
    <div>
      <div className="card d-flex p-1 my-3" style={{ width: "240px" ,backgroundColor:'lightcyan'}}>
        <img
          src="/img.jpg"
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
