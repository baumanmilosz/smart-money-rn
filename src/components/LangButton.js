import React from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import i18n from '../lib/i18n';

const styles = StyleSheet.create({
  langButton: {
    margin: 20,
  },
});

const LangButton = ({lang, imgSource}) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <TouchableOpacity onPress={() => changeLanguage(lang)} style={styles.langButton}>
      <Image source={imgSource} />
    </TouchableOpacity>
  );
};

LangButton.propTypes = {
  lang: PropTypes.string.isRequired,
  imgSource: PropTypes.number.isRequired,
};

export default LangButton;
