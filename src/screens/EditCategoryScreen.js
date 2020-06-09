import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import CommonHeader from '../components/CommonHeader';
import CategoryForm from '../components/CategoryForm';
import CommonView from '../components/CommonView';
import {Context as CategoryContext} from '../context/CategoryContext';

const EditCategoryScreen = ({route}) => {
  const {editCategory} = useContext(CategoryContext);
  const {name: categoryName, type} = route.params;
  return (
    <>
      <CommonHeader text="Edit category" />
      <CommonView>
        <CategoryForm
          submitButtonAction={(name) => editCategory(name, type, categoryName)}
          submitButtonText="Update category"
          isEditForm
        />
      </CommonView>
    </>
  );
};

EditCategoryScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditCategoryScreen;
