import { useState } from "react";

import closeIcon from "../images/close-icon.png";
function ModalFilter(props: any) {

  const [val,setVal]=useState(props.filterText);
  const handleChange=(e:any)=>{
    setVal(e.currentTarget.value);
    props.updateFilter(e.currentTarget.value)

  }
  return (
    <>
      <div className="modal-frame filter">
        <div className="heading">
          <div className="title">

            Filter
          </div>
          <button className="close" onClick={props.handleModalClose}>
            
          <img src={closeIcon} alt="close-icon" />
          </button>
        </div>
        <div className="content">
          <label htmlFor="Rick">
            <span>Rick</span>
            <input
                type="radio"
                name="Rick"
                value="Rick"
                checked={val === "Rick"}
                onChange={handleChange}
            />
          </label>
          <label htmlFor="Morty">
            <span>Morty</span>
            <input
                type="radio"
                name="Morty"
                value="Morty"
                checked={val === "Morty"}
                onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </>
  );
}
export default ModalFilter;
