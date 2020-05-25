import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import CommonHeader from '../components/CommonHeader';

const AccountScreen = ({navigation}) => {
  return (
    <View>
      <CommonHeader text="Account" navigation={navigation} />
    </View>
  );
};

AccountScreen.propTypes = {
  navigation: PropTypes.func.isRequired,
};

export default AccountScreen;
