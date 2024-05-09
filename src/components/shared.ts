import {Dimensions} from 'react-native';

export const scaleSize = (size: number) => {
  const scale = Dimensions.get('window').width / 1920;
  return size * scale;
};
