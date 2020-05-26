import React from 'react';
import {Header} from 'react-native-elements';
import PropTypes from 'prop-types';
import CommonNavButton from './CommonNavButton';
import {navigate} from '../helpers/navigationRef';

const CommonHeader = ({navigation, text}) => {
  return (
    <Header
      leftComponent={
        <CommonNavButton icon="menu" handleNavigation={() => navigation.openDrawer()} />
      }
      centerComponent={{text, style: {color: '#fff'}}}
      rightComponent={<CommonNavButton icon="home" handleNavigation={() => navigate('Home')} />}
      statusBarProps={{translucent: true}}
      containerStyle={{
        backgroundColor: '#004A9E',
      }}
    />
  );
};

CommonHeader.propTypes = {
  text: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default CommonHeader;
