import React, { useState } from 'react';
import {  ExclamationCircleOutlined } from '@ant-design/icons';
import { Layout, Button, Table, Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import PopupContextMenu from '../../components/PopupContextMenu'
import CategoryForm from './CategoryForm'
import { categoriesData, deleteAsyncCategory } from './categorySlice';

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
  //END

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },   
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <h2 style={{ color: '#f2f2f2', marginBottom: '0', marginTop: '10px' }}>Categories</h2>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div>
          <Button type="link" size={'large'} onClick={() => onExpandCollapse()}>
            {`Expand/Collapse :: ( isExpandable: ${isExpandAll} )`}
          </Button>
        </div>
        <div id='container' className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Table            
            columns={columns}
            onRow={(record) => {
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
            }}
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