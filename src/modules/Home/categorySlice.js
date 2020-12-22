import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep, forEach } from 'lodash';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [
      {
        key: '1',
        title: 'Electronics',
        children: [
          {
            key: '11',
            title: 'Cell Phones',
            children: []
          },
          {
            key: '12',
            title: 'Camera',
            children: [
              {
                key: '121',
                title: 'Accessories',
                children: []
              },
            ],
          },
          {
            key: '13',
            title: 'Computers',
            children: [
              {
                key: '131',
                title: 'Laptop',
                children: [
                  {
                    key: '1311',
                    title: 'Apple',
                    children: []
                  },
                  {
                    key: '1312',
                    title: 'LG',
                    children: []
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: '2',
        title: 'Furniture',
        children: []
      },
    ],
  },
  reducers: {
    addSubCategory: (state, action) => ({
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes      
      ...state.category,
      categories: action.payload,
    }),
    editCategory: (state, action) => ({
      ...state.category,
      categories: action.payload,
    }),
    deleteCategory: (state, action) => ({
      ...state.category,
      categories: action.payload,
    }),
  },
});

export const { addSubCategory, editCategory, deleteCategory } = categorySlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(deleteAsyncCategory(selectedNode))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// START: delete category
export const deleteAsyncCategory = categoryObj => dispatch => {
  const { cloneCategories, deleteCategoryObj } = categoryObj
  // const afterDeletedCategories = cloneCategories.map((catObj) => {
  //   return deleteCategoryNode(catObj, deleteCategoryObj)
  // })
  cloneCategories.forEach(function iter(category) {
    if (deleteCategoryObj.key === category.key) {          
      // Here need to implement delete node
    }
    Array.isArray(category.children) && category.children.forEach(iter);
  });  
  setTimeout(() => {
    dispatch(deleteCategory(cloneCategories));
  }, 1000);
};


// START: Insert sub category
export const insertAsyncCategory = categoryObj => dispatch => {
  const { cloneCategories, parentNode, formData } = categoryObj  
  cloneCategories.forEach(function iter(category) {
    if (parentNode.key === category.key) {          
      category.children.push(formData);
    }
    Array.isArray(category.children) && category.children.forEach(iter);
  });
  setTimeout(() => {
    dispatch(addSubCategory(cloneCategories));
  }, 1000);
};

// START: update category
export const updateAsyncCategory = categoryObj => dispatch => {
  const { cloneCategories, formData } = categoryObj
  cloneCategories.forEach(function iter(category) {
    if (formData.key === category.key) {
      category.title = formData.title;
    }
    Array.isArray(category.children) && category.children.forEach(iter);
  });
  setTimeout(() => {    
    dispatch(editCategory(cloneCategories));
  }, 1000);
};

export const categoriesData = state => state && state.category && state.category.categories;

export default categorySlice.reducer;
