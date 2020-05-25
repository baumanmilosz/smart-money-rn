import React from 'react';
import {Header} from 'react-native-elements';
import PropTypes from 'prop-types';
import CommonNavButton from './CommonNavButton';

const CommonHeader = ({navigation, text}) => {
  return (
    <Header
      leftComponent={
        <CommonNavButton icon="menu" handleNavigation={() => navigation.openDrawer()} />
      }
      centerComponent={{text, style: {color: '#fff'}}}
      rightComponent={
        <CommonNavButton icon="home" handleNavigation={() => navigation.navigate('Home')} />
      }
    />
  );
};

CommonHeader.propTypes = {
  text: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default CommonHeader;
