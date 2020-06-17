import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import theme from '../styles/theme';
import {Context as AuthContext} from '../context/AuthContext';

const styles = StyleSheet.create({
  avatarBackground: {
    backgroundColor: theme.colors.secondary,
  },
});

const UserAvatar = ({size}) => {
  const {
    state: {
      userInfo: {initials},
    },
  } = useContext(AuthContext);
  return (
    <Avatar.Text
      label={initials || ''}
      size={size || 50}
      color={theme.colors.white}
      style={styles.avatarBackground}
    />
  );
};

UserAvatar.defaultProps = {
  size: null,
};

UserAvatar.propTypes = {
  size: PropTypes.number,
};

export default UserAvatar;
