function ListItem(props: any) {
  //console.log("ListItem props", props);
  return (
    <>
      <div className="item" onClick={(e)=>{props.handleModal("detail",props?.item?.id)}}>
        <div className="item-profile">
          <img src={props?.item?.image} alt={props?.item?.name} />
        </div>
        <div className="item-info">
          <div className="item-info-id">
            <span className="sub-title">#id: </span>
            <span className="content">{props?.item?.id}</span>
          </div>

          <div className="item-info-desc">
            <div className="item-info-desc-name">
              <span className="sub-title">Name: </span>
              <span className="content">{props?.item?.name}</span>
            </div>
            <div className="item-info-desc-location">
              <span className="sub-title">Location: </span>
              <span className="content">{props?.item?.location?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ListItem;
