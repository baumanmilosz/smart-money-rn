import React from 'react';
import {WebView} from 'react-native-webview';
import CommonHeader from '../components/CommonHeader';
import CommonView from '../components/CommonView';

const HomeScreen = () => {
  return (
    <CommonView>
      <CommonHeader text="Home" />
      <WebView source={{uri: 'https://youtube.com/'}} />
    </CommonView>
  );
};

export default HomeScreen;
