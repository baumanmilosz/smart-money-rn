import React, {useContext} from 'react';
import CommonHeader from '../components/CommonHeader';
import CategoryForm from '../components/CategoryForm';
import CommonView from '../components/CommonView';
import {Context as CategoryContext} from '../context/CategoryContext';
import CommonSnackbar from '../components/CommonSnackbar';

const AddCategoryScreen = () => {
  const {
    state: {errorMessage},
    addCategory,
  } = useContext(CategoryContext);
  return (
    <>
      <CommonHeader text="Categories" />
      <CommonView>
        <CategoryForm submitButtonAction={addCategory} submitButtonText="Add category" />
      </CommonView>
      {errorMessage ? <CommonSnackbar variant="error" text={errorMessage} /> : null}
    </>
  );
};

export default AddCategoryScreen;
