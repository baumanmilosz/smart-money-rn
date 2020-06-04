import React from 'react';
import {Header} from 'react-native-elements';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import CommonNavButton from './CommonNavButton';
import {navigate} from '../helpers/navigationRef';

const CommonHeader = ({text}) => {
  const navigation = useNavigation();
  return (
    <Header
      leftComponent={
        <CommonNavButton icon="menu" handleNavigation={() => navigation.openDrawer()} />
      }
      centerComponent={{text, style: {color: '#fff'}}}
      rightComponent={<CommonNavButton icon="home" handleNavigation={() => navigate('Summary')} />}
      statusBarProps={{translucent: true}}
      containerStyle={{
        backgroundColor: '#004A9E',
      }}
    />
  );
};

CommonHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CommonHeader;
