import React, {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import CommonFormButton from '../components/CommonFormButton';
import CommonView from '../components/CommonView';
import {Context as AuthContext} from '../context/AuthContext';

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ConnectionProblemScreen = () => {
  const {
    state: {isButtonLoading},
    checkConnection,
  } = useContext(AuthContext);
  return (
    <CommonView contentStyle={styles.viewWrapper}>
      <Text>No Internet Connection</Text>
      <CommonFormButton onSubmit={checkConnection} title="Retry" loading={isButtonLoading} />
    </CommonView>
  );
};

export default ConnectionProblemScreen;
