import * as React from 'react';
import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function reset(...args) {
  navigationRef.current?.dispatch(CommonActions.reset(...args));
}
export function reset2(name) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name}],
    }),
  );
}
export function onBack() {
  navigationRef.current?.goBack();
}
export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function replace(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}