import './styles/InfoMenu.css';

function InfoMenu({menuPos, visible, handleDelete}) {
  return (
    <>
      {visible == false ? (
        <></>
      ) : (
        <div
          style={{
            top: menuPos.posY,
            left: menuPos.posX,
          }}
          onClick={handleDelete}
          className="info_menu"
        >
          <ul className="info_menu_list">
            <div className="info_menu_list_item">
              <span>Delete</span>
              <div className="info_menu_list_item_img_container center">
                <img src="delete_icon.png" height={16} width={16} alt="Del" />
              </div>
            </div>
          </ul>
        </div>
      )}
    </>
  );
}

export default InfoMenu;
