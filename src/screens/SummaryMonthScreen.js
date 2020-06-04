import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';
import {Context as SettingsContext} from '../context/SettingsContext';
import Loader from '../components/Loader';
import CommonView from '../components/CommonView';

const SummaryMonthScreen = () => {
  const {
    state: {currentMonth},
    getMonth,
  } = useContext(SettingsContext);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(currentMonth);
    navigation.addListener('focus', () => {
      getMonth();
    });
  }, []);
  return (
    <View>
      <CommonHeader text="Summary" />
      <CommonView>
        {!currentMonth ? <Loader /> : <Text>{`Budget month - ${currentMonth}`}</Text>}
      </CommonView>
    </View>
  );
};

export default SummaryMonthScreen;
