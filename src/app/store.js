import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../modules/Home/categorySlice';

export default configureStore({
  reducer: {
    category: categoryReducer,
  },
});
