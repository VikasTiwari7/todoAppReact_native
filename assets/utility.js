import {Platform, Alert} from 'react-native';
import {Dimensions, PixelRatio} from 'react-native';
// import * as titles from '../constants/title';
export var deviceHeight = Dimensions.get('window').height;
export var deviceWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';


export const setInLocalStorge = async (key: String, token) => {
  try {
    const res = await AsyncStorage.setItem(key, JSON.stringify(token));
    console.log('setInLocalStorge', res);
  } catch (err) {
    console.log('setInLocalStorge Error', err);
  }
};

export const getFromLocalStorge = async (key: String) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token ? JSON.parse(token) : null;
  } catch (err) {
    console.log('getFromLocalStorge Error', err);
  }
};

