import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { useDispatch } from 'react-redux';
import { getCurrentUserId } from '../../../backend/auth';
import { getAllOfCollection, getData } from '../../../backend/utility';
import { Wrappers, Texts, Images, Buttons } from '../../../components';
import { appImages, appStyles, colors, fontFamily, routes } from '../../../services';
import { allUsers, user_setup } from '../../../redux/actions';

const Splash = ({ navigation }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    checkUserLogedIn()
  }, [])

  const checkUserLogedIn = async () => {
    const token = await getCurrentUserId()
    const userData = await getData('Users', token).then(res => {
      dispatch(user_setup(res))
    })

    getAllOfCollection('Users').then(res => {
      dispatch(allUsers(res))
    })

    if (token) {
      navigation.replace(routes.app)
    } else {
      navigation.replace(routes.signin)
    }
  }

  return (
    <Wrappers.Main style={styles.container}>
      <Texts.SmallTitle style={styles.text}>CHAT WITH YOUR FRIEND</Texts.SmallTitle>
    </Wrappers.Main>
  );
};

export default Splash;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colors.appBgColor1
  }
});
