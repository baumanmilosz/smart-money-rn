import React, {useContext, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import CommonView from '../components/CommonView';
import {Context as AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const {getUserInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserInfo();
    });
  }, []);
  return (
    <>
      <CommonHeader text="Home" />
      <CommonView>
        <WebView source={{uri: 'https://youtube.com/'}} />
      </CommonView>
    </>
  );
};

export default HomeScreen;
