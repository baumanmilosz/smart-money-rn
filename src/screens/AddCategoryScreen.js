import React from 'react';
import CommonHeader from '../components/CommonHeader';
import CategoryForm from '../components/CategoryForm';
import CommonView from '../components/CommonView';

const AddCategoryScreen = () => {
  return (
    <>
      <CommonHeader text="Categories" />
      <CommonView>
        <CategoryForm />
      </CommonView>
    </>
  );
};

export default AddCategoryScreen;
