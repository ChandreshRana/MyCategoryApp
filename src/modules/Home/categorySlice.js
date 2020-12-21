import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep, forEach } from 'lodash';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [
      {
        key: 1,
        title: 'Electronics',
        children: [
          {
            key: 11,
            title: 'Cell Phones',
            children: []
          },
          {
            key: 12,
            title: 'Camera',
            children: [
              {
                key: 121,
                title: 'Accessories',
                children: []
              },
            ],
          },
          {
            key: 13,
            title: 'Computers',
            children: [
              {
                key: 131,
                title: 'Laptop',
                children: [
                  {
                    key: 1311,
                    title: 'Apple',
                    children: []
                  },
                  {
                    key: 1312,
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
        key: 2,
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
  const afterDeletedCategories = cloneCategories.map((catObj) => {
    return deleteCategoryNode(catObj, deleteCategoryObj)
  })
  console.log('afterDeletedCategories: ', afterDeletedCategories)  
  setTimeout(() => {
    dispatch(deleteCategory(afterDeletedCategories));
  }, 1000);
};

export const deleteCategoryNode = (categoryObj, deletedNode) => {
  const { key, children } = categoryObj
  if (deletedNode.key === key) {     
    // Have to work here for delete child node   
    return null
  } else if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      deleteCategoryNode(children[i], deletedNode)
    }
  }
  return categoryObj 
}
// END

// START: Insert sub category
export const insertAsyncCategory = categoryObj => dispatch => {  
  const { cloneCategories, parentNode, variables } = categoryObj
  const afterInsteredCategories = cloneCategories.map((catObj) => {
    return insertNode(parentNode, catObj, variables)
  })  
  setTimeout(() => {
    dispatch(addSubCategory(afterInsteredCategories));
  }, 1000);
};

export const insertNode = (parentNode, categoryObj, newNode) => {
  const { key, children } = categoryObj
  if (parentNode.key === key) {        
    const cloneChildren = cloneDeep(children)
    cloneChildren.push(newNode)    
    return { ...categoryObj, children: cloneChildren }
  } else if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      insertNode(parentNode, children[i], newNode)
    }
  }
  return categoryObj
}
// END

// START: update category
export const updateAsyncCategory = categoryObj => dispatch => {
  const { cloneCategories, variables } = categoryObj
  const afterUpdatedCategories = cloneCategories.map((catObj) => {
    return updateCategoryNode(catObj, variables)
  })  
  setTimeout(() => {
    dispatch(editCategory(afterUpdatedCategories));
  }, 1000);
};

export const updateCategoryNode = (categoryObj, updatedNode) => {  
  const { key, children } = categoryObj
  if (updatedNode.key === key) {            
    return { ...categoryObj, title: updatedNode.title }
  } else if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      updateCategoryNode(children[i], updatedNode)
    }
  }
  return categoryObj
}
// END

export const categoriesData = state => state && state.category && state.category.categories;

export default categorySlice.reducer;
