import React from 'react';
import {View, StyleSheet} from 'react-native';
import LangButton from './LangButton';
import enFlag from '../assets/icons/en-flag.png';
import plFlag from '../assets/icons/pl-flag.png';

const styles = StyleSheet.create({
  langButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

const LangButtonsMolecule = () => {
  return (
    <View style={styles.langButtonsWrapper}>
      <LangButton lang="en" imgSource={enFlag} />
      <LangButton lang="pl" imgSource={plFlag} />
    </View>
  );
};

export default LangButtonsMolecule;
