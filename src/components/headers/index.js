import React from 'react';
import { appGifs, appImages, colors, routes } from '../../services';
import { Icons, Texts, Wrappers } from '..';
import { Image, StatusBar, StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const Primary = ({ onPress, barStyle, userName, navigation, style }) => {
  return (
    <Wrappers.Primary style={styles.image_view}>
      {/* <StatusBar backgroundColor={colors.blue} /> */}
      <Icons.Back onPress={onPress} />
      <Texts.MediumTitle style={style}>{userName}</Texts.MediumTitle>
    </Wrappers.Primary>
  );
};



export const styles = StyleSheet.create({
  image_view: {
    flexDirection: 'row',
    marginHorizontal: width(4),
    elevation: 5
  },
  logo: {
    width: totalSize(7),
    height: totalSize(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Main Headers
  main_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.whiteSmoke,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: height(11),
  },
  profile_header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: colors.whiteSmoke,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: height(11),
  },
  image_view1: {
    flexDirection: 'row',
    marginHorizontal: width(4),
  },
  logo1: {
    width: totalSize(6),
    height: totalSize(6),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },
  pageName: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginHorizontal: width(2),
  },
  user_view: {
    backgroundColor: colors.snow,
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: width(4),
  },
  icon: {
    alignSelf: 'center',
    padding: 13,
  },
  profileIcon: {
    alignSelf: 'center',
    padding: 13,
    justifyContent: 'flex-end'
  }
});
