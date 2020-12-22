import React, { useState } from 'react';
import {  ExclamationCircleOutlined } from '@ant-design/icons';
import { Layout, Button, Table, Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import PopupContextMenu from '../../components/PopupContextMenu'
import CategoryForm from './CategoryForm'
import { categoriesData, deleteAsyncCategory } from './categorySlice';
import './home.scss'

const { Header, Content, Footer } = Layout;
const { confirm } = Modal;

const Home = () => {  
  const listCategories = useSelector(categoriesData);
  const dispatch = useDispatch();

  const [selectedNode, setSelectedNode] = useState();
  const [showModal, setShowModal] = useState();
  const [isEditForm, setIsEditForm] = useState(false);
  const [isExpandAll, setExpandAll] = useState(true);
  const [popup, setPopupState] = useState({
    visible: false,
    x: 0, y: 0
  });

  const handleAdd = (record) => {
    setShowModal(true);
    setSelectedNode(record)
  };

  const handleDelete = (record) => {
    const cloneCategories = cloneDeep(listCategories)
    dispatch(deleteAsyncCategory({ cloneCategories, deleteCategoryObj: record }))
  };

  const handleEdit = (record) => {
    setIsEditForm(true);
    setSelectedNode(record);
    setShowModal(true);
  };

  const onExpandCollapse = () => {
    // currently it won't work 
    setExpandAll(!isExpandAll)
  }
  
  const onAddSubCategoryClick = record => {    
    handleAdd(record)
  }
  const onEditCategoryClick = record => {
    handleEdit(record)
  }
  const onDeleteCategoryClick = record => {    
    confirm({
      closable: true,
      icon: <ExclamationCircleOutlined />,
      title: 'Are you Sure?',
      content: 'Do you want to remove this category?',
      okType: 'danger',
      onOk: () => {
        handleDelete(record)
      },
    });
  }
  
  const onRow = (record) => {
    return {
      onContextMenu: (event) => {
        event.preventDefault()                  
        if (!popup.visible) {                    
          document.addEventListener(`click`, function onClickOutside() {
            setPopupState({ visible: false })
            document.removeEventListener(`click`, onClickOutside)
          })
        }
        setPopupState({
          record,
          visible: true,
          x: event.clientX,
          y: event.clientY
        })
      }
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },   
  ];

  return (
    <Layout className='app-content'>
      <Header className='header-conatiner'>
        <h2 className='header-label'>Categories</h2>
      </Header>
      <Content className="site-layout content-container">
        <div>
          <Button type="link" size={'large'} onClick={() => onExpandCollapse()}>
            {`Expand/Collapse :: ( isExpandable: ${isExpandAll} )`}
          </Button>
        </div>
        <div id='container' className="site-layout-background table-conatiner">
          <Table            
            columns={columns}
            onRow={onRow}
            dataSource={listCategories}
            pagination={false}
            showHeader={false}
            expandable={{ defaultExpandAllRows: isExpandAll }}
          />          
          <PopupContextMenu
            {...popup}
            onAddSubCategoryClick={onAddSubCategoryClick}           
            onEditCategoryClick={onEditCategoryClick}           
            onDeleteCategoryClick={onDeleteCategoryClick}           
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design Created by Ant UED</Footer>
      {
        showModal && <CategoryForm
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedNode={setSelectedNode}
          setIsEditForm={setIsEditForm}
          isUpdate={isEditForm ? true : false}
          selectedNode={selectedNode}
        />
      }
    </Layout>
  );
}

export default Home;