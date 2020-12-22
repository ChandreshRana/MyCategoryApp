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
        <div className='list-container'>
          <PlusOutlined /><span className='p-10'>Add Sub Category</span>
        </div>
      </li>
      <li onClick={() => onEditCategoryClick(record)}>
        <div className='list-container'>
          <EditOutlined /><span className='p-10'>Edit Category</span>
        </div>
      </li>
      <li onClick={() => onDeleteCategoryClick(record)}>
        <div className='list-container'>
          <DeleteOutlined /><span className='p-10'> Delete Category</span>
        </div>
      </li>
    </ul>
  ) : null
}

export default PopupContextMenu