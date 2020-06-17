import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../styles/theme';
import {Context as NavigationContext} from '../context/NavigationContext';

const CommonView = ({children, style, contentStyle}) => {
  const {
    state: {isDarkMode},
  } = useContext(NavigationContext);
  const backgroundColor = isDarkMode ? theme.colors.black : theme.colors.white;

  const [isRefreshing, setRefreshing] = useState(false);

  const styles = StyleSheet.create({
    styledCommonView: {
      padding: 5,
      backgroundColor,
    },
    styledContentStyle: {
      flex: 1,
    },
  });

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [isRefreshing]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.styledCommonView, style]}
      contentContainerStyle={[styles.styledContentStyle, contentStyle]}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
      {children}
    </ScrollView>
  );
};

CommonView.defaultProps = {
  style: null,
  contentStyle: null,
};

CommonView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  style: PropTypes.object,
  contentStyle: PropTypes.object,
};

export default CommonView;
