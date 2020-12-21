import React, { useState, useRef } from 'react';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Layout, Popconfirm, Button, Table } from 'antd';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import PopupContextMenu from '../../components/PopupContextMenu'
import CategoryForm from './CategoryForm'
import { categoriesData, insertAsyncCategory, deleteAsyncCategory, updateAsyncCategory } from './categorySlice';

const { Header, Content, Footer } = Layout;

const Home = () => {
  const outerRef = useRef(null);
  const listCategories = useSelector(categoriesData);
  const dispatch = useDispatch();

  const [selectedNode, setSelectedNode] = useState();
  const [showModal, setShowModal] = useState();
  const [isEditForm, setIsEditForm] = useState(false);
  const [isExpandAll, setExpandAll] = useState(true);

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
    // currentlt it won't work 
    setExpandAll(!isExpandAll)
  }

  //Start: This is the context menu list click call backs. Currently not using these functions, but from here we can perform 
  const onAddSubCategoryClick = record => {
    // console.log('onAddSubCategoryClick: ', record)
    // dispatch(insertAsyncCategory())
  }
  const onEditCategoryClick = record => {
    // console.log('onEditCategoryClick: ', record)
    // dispatch(updateAsyncCategory())
  }
  const onDeleteCategoryClick = record => {
    // console.log('onDeleteCategoryClick: ', record)
    // dispatch(deleteAsyncCategory(record))
  }
  //END

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'operation',
      width: 150,
      dataIndex: 'operation',
      render: (text, record) =>
        <div>
          <Popconfirm title="Sure to delete?"
            onConfirm={() => handleDelete(record)}>
            <DeleteOutlined />
          </Popconfirm>
          <Button
            type="link"
            icon={<PlusOutlined />}
            onClick={() => handleAdd(record)}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
        </div>
    },
  ];

  console.log('is: ', isExpandAll)

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
        <div id='container' className="site-layout-background" style={{ padding: 24, minHeight: 380 }} ref={outerRef}>
          <Table
            ref={outerRef}
            columns={columns}
            dataSource={listCategories}
            pagination={false}
            showHeader={false}
            expandable={{ defaultExpandAllRows: isExpandAll }}
          />
          <PopupContextMenu
            outerRef={outerRef}
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