import { useState } from "react";
import Navbar from "../../componants/Navbar";

const AddProducts = () => {
  const [fileItems, setFileItems] = useState([]);
  const[preview,setPreviews]=useState([]);

  const handleDrop =(e)=>{
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setPreviews((preview)=>[...preview,...newFiles])
    console.log(preview)
  }

  const handleDragOver=(e)=>{
    e.preventDefault();
  }

  
  const handleFileInput = (e) => {
    const newFiles = Array.from(e.target.files);
    setFileItems(newFiles);

    const newPreviews = newFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newPreviews)
      .then((results) => {
        setPreviews((preview) => [...preview, ...results]);
      })
      .catch((error) => console.error("Error generating previews:", error));
    }
  return (
    <div>
      <Navbar/>
      <div
        className="file-uploader-container my-4 w-50 h-100 bg-secondry border border-primary rounded m-auto d-flex justify-content-start align-items-center flex-column"
        style={{ borderWidth: "2px" }}
      >
        <div
          className="drop-zone-area mb-1 bg-secondry w-100 text-center rounded d-flex justify-content-center align-items-center flex-column"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            height: "200px",
            backgroundColor: "lightGrey",
            borderStyle: "dashed",
            borderWidth: "1px",
          }}
        >
          <div className="upload-icon text-center">&#8682;</div>
          <p>Drag files to upload</p>
          <input
            type="file"
            multiple
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
          <label
            htmlFor="file-upload"
            className="w-75 bg-primary text-white rounded "
            style={{ height: "30px", cursor: "pointer" }}
          >
            Upload Files
          </label>
        </div>

        {/* Other Details */}
        <div className="other-deatils d-flex p-2 flex-column w-100">
          <div className="w-100 mb-3">
            <label className="form-label">Category</label>
            <select className="form-select " id="product-category">
              <option value="1" style={{ opacity: 0.5 }}>
                Select Category
              </option>
              <option value="2">Home Decor</option>
              <option value="3">Food</option>
              <option value="4">Gift Items</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" id="product-name" />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="text" id="product-price" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              id="product=description"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
