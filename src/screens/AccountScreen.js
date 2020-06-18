import React, {useContext} from 'react';
import CommonHeader from '../components/CommonHeader';
import {Context as AuthContext} from '../context/AuthContext';
import CommonView from '../components/CommonView';
import UserForm from '../components/UserForm';
import CommonSnackbar from '../components/CommonSnackbar';

const AccountScreen = () => {
  const {
    state: {errorMessage, success},
  } = useContext(AuthContext);

  return (
    <>
      <CommonHeader text="Account" />
      <CommonView>
        <UserForm />
      </CommonView>
      {errorMessage ? <CommonSnackbar variant="error" text={errorMessage} /> : null}
      {success ? <CommonSnackbar variant="success" text="Saved successfully" /> : null}
    </>
  );
};

export default AccountScreen;
