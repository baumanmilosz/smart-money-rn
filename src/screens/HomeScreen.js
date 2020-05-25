import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import CommonHeader from '../components/CommonHeader';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <CommonHeader text="Home" navigation={navigation} />
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
