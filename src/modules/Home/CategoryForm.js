import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { uuid } from 'uuidv4';
import { cloneDeep, forEach } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesData, insertAsyncCategory, updateAsyncCategory } from './categorySlice';

const CategoryForm = (props) => {
  const {
    isUpdate,
    showModal,
    setShowModal,
    selectedNode,
    setSelectedNode,  
    setIsEditForm  
  } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const listCategories = useSelector(categoriesData);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
    setSelectedNode();
    setIsEditForm(false);
  };

  const onUserSubmitFinish = async (values) => {
    setLoading(true);
    const variables = isUpdate
      ? { ...values, key: selectedNode.key }
      : { ...values, key: uuid(), children: [] };
    try {
      const cloneCategories = cloneDeep(listCategories)
      if (isUpdate) {        
        dispatch(updateAsyncCategory({ cloneCategories, variables }))
      } else {
        dispatch(insertAsyncCategory({ cloneCategories, parentNode: selectedNode, variables }))
      }
      setShowModal(false);
      setSelectedNode(null);
      setIsEditForm(false);
      form.resetFields();
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    form.submit();
  };

  return (
    <Modal
      title={isUpdate ? "Edit Category" : "Add Category"}
      visible={showModal}
      confirmLoading={loading}
      onOk={handleAdd}
      className="dialog"
      okText={isUpdate ? "Save" : "Add"}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        initialValues={isUpdate ? selectedNode : {}}
        layout="vertical"
        onFinish={onUserSubmitFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
