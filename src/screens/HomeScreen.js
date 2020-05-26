import React from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';
import CommonHeader from '../components/CommonHeader';
import CommonView from '../components/CommonView';

const HomeScreen = ({navigation}) => {
  return (
    <CommonView>
      <CommonHeader text="Home" navigation={navigation} />
      <WebView source={{uri: 'https://youtube.com/'}} />
    </CommonView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
