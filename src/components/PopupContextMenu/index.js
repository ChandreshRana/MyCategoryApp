import React from "react";
import ContextMenu from "./ContextMenu";
import './style.scss'

const PopupContextMenu = (props) => {
  const { 
    outerRef, 
    onAddSubCategoryClick,
    onEditCategoryClick,
    onDeleteCategoryClick,
  } = props
  const { xPos, yPos, menu } = ContextMenu(outerRef);
  if (menu) {
    return (
      <ul className="popup" style={{ top: yPos, left: xPos }}>
        <li onClick={onAddSubCategoryClick}>Add Sub Category</li>
        <li onClick={onEditCategoryClick}>Edit Category</li>
        <li onClick={onDeleteCategoryClick}>Delete Category</li>
      </ul>
    );
  }
  return null;
};

export default PopupContextMenu;