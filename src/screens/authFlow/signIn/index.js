import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { height, totalSize, width } from 'react-native-dimension';
import { appImages, colors, routes, Validations } from '../../../services';
import { BottomSheet, Buttons, Icons, Images, ScrollViews, Spacers, TextInputs, Texts, Toasts, Wrappers } from '../../../components';
import { getCurrentUserId, signIn } from '../../../backend/auth';
import Toast from 'react-native-root-toast';
import { useDispatch } from 'react-redux';
import { user_setup } from '../../../redux/actions';
import { getData } from '../../../backend/utility';



const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(true)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const Validation = () => {

    !email ? setEmailError('Please enter email') : setEmailError('')
    !password ? setPasswordError('Please enter password') : setPasswordError('')
    if (email.length > 1 && password.length > 1) {
      return true
    } else return false

  }

  const handleSignIn = async () => {
    setLoading(true)
    if (Validation()) {
      let user = await signIn(email, password)
      if (user) {
        const userData = getData('Users', user).then(res => {
          setLoading(false)
          dispatch(user_setup(res))
          navigation.navigate(routes.app)
        })
      }
    } else {
      console.log('error')
      setLoading(false)
    }
  }

  return (
    <Wrappers.Main >
      <ScrollViews.KeyboardAvoiding>

        <Spacers.Spacer height={height(3)} />

        <Texts.MediumTitle style={{ alignSelf: 'center' }}>Sign in</Texts.MediumTitle>

        <Spacers.DoubleBase />

        <TextInputs.Colored placeholder={'Enter email'}
          value={email}
          onChangeText={e => {
            setEmail(e)
            setEmailError('')
          }}
          error={emailError}
        />
        <Spacers.Base />

        <TextInputs.Colored placeholder={'******'}
          value={password}
          onChangeText={e => {
            setPassword(e)
            setPasswordError('')
          }}
          secureTextEntry={passwordVisible}
          iconName={passwordVisible ? 'eye' : 'eye-off'}
          iconType={'feather'}
          onPressIcon={() => setPasswordVisible(!passwordVisible)}
          error={passwordError}
        />

        <Spacers.Spacer height={height(35)} />
        <Buttons.Colored isLoading={loading} text={'SIGNIN'} onPress={handleSignIn} />
        <Spacers.Base />
        <Texts.Medium style={{ alignSelf: 'center' }}>Don't have an account? <Texts.Medium onPress={() => navigation.navigate(routes.signup)} style={{ fontWeight: 'bold' }}>signup</Texts.Medium></Texts.Medium>
      </ScrollViews.KeyboardAvoiding>
    </Wrappers.Main>


  );
};

export default SignIn;


