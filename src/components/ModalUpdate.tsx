
import { useState } from "react";
import closeIcon from "../images/close-icon.png";
import photoIcon from "../images/photo-icon.png";
import updateIcon from "../images/update-icon.png";

import {uploadImage} from "../library/upload"

function ModalUpdate(props: any) {
  
  const [name, setName] = useState(props.item.name??"");
  const [location, setLocation] = useState(props.item.location.name??"");
  const [image, setImage] = useState(props.item.image??"");
  const [imageLoading, setImageLoading] = useState(false);
  
  return (
    <>
      <div className="modal-frame modal-add">
        <div className="heading">
          <div className="title">
            <a className="delete-btn" onClick={(e)=>props.deleteCharacter(props.item.id)}>Delete</a>
          </div>
          <button className="close" onClick={props.handleModalClose}>
            <img src={closeIcon} alt="close-icon" />
          </button>
        </div>
        <div className="content">
        <div className="image-space">
            <div>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={async (e) => {
                  setImageLoading(true)
                  uploadImage(e.target.files).then(response=>
                    {
                      response.statusText==="OK"&&setImage(response.data.url);
                      setImageLoading(false);
                    })
                }}
              />
              {image ? (
               <>
               <div className="update-icon-div">
                  <img src={updateIcon} alt="" className="update-photo-icon" />
               </div>
               <img src={image} alt="" className="item-photo" />
               </> 
              ) : (
                <button className="add-photo">
                  <img src={photoIcon} alt="photo-icon" />
                  <span>Add photo</span>
                </button>
              )}
            </div>
          </div>
          <input
            type="text"
            className="name form-input"
            placeholder="Name"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
          <input
            type="text"
            className="location form-input"
            placeholder="Location"
            onChange={(e) => setLocation(e.currentTarget.value)}
            value={location}
          />
           <button
            className="primary"
            disabled={!name || !location || imageLoading}
            onClick={(e) => props.updateCharacter(props.item.id,name, location,image)}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
export default ModalUpdate;
