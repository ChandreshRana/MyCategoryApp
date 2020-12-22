import React from "react"
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './style.scss'

const PopupContextMenu = ({
  record, visible, x, y,
  onAddSubCategoryClick,
  onEditCategoryClick,
  onDeleteCategoryClick
}) => {
  return visible ? (
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <li onClick={() => onAddSubCategoryClick(record)}>
        <div><PlusOutlined /><span style={{ padding: '10px' }}>Add Sub Category</span></div>
      </li>
      <li onClick={() => onEditCategoryClick(record)}>
        <div><EditOutlined /><span style={{ padding: '10px' }}>Edit Category</span></div>
      </li>
      <li onClick={() => onDeleteCategoryClick(record)}>
        <div><DeleteOutlined /><span style={{ padding: '10px' }}> Delete Category</span></div>
      </li>
    </ul>
  ) : null
}

export default PopupContextMenu