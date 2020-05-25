import {CommonActions} from '@react-navigation/native';

let navigation;

export const setNavigator = (nav) => {
  navigation = nav;
};

export const navigate = (routeName, params) => {
  navigation.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    })
  );
};
