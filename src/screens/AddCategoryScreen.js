import React, {useContext} from 'react';
import CommonHeader from '../components/CommonHeader';
import CategoryForm from '../components/CategoryForm';
import CommonView from '../components/CommonView';
import {Context as CategoryContext} from '../context/CategoryContext';

const AddCategoryScreen = () => {
  const {addCategory} = useContext(CategoryContext);
  return (
    <>
      <CommonHeader text="Categories" />
      <CommonView>
        <CategoryForm submitButtonAction={addCategory} submitButtonText="Add category" />
      </CommonView>
    </>
  );
};

export default AddCategoryScreen;
