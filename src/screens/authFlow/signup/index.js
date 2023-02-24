import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { height, totalSize, width } from 'react-native-dimension';
import { appImages, colors, routes, Validations } from '../../../services';
import { BottomSheet, Buttons, Icons, Images, ScrollViews, Spacers, TextInputs, Texts, Toasts, Wrappers } from '../../../components';
import { signUp } from '../../../backend/auth';
import { FromCamera, FromGallary } from '../../../services/helpingMethods';
import { saveData, uploadProfileImage } from '../../../backend/utility';
import { useDispatch } from 'react-redux';
import { allUsers, user_setup } from '../../../redux/actions';


const SignUp = ({ navigation }) => {
    const [profile, setProfile] = useState({ path: '' })
    const RBSheet1 = useRef();
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [userNameError, setUserNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        getAllUsers()
    }, [

    ])
    const Validation = () => {
        !userName ? setUserNameError('Please enter username') : userName?.length < 3 ? setUserNameError('username must be atleast 3 character') : setUserNameError('')
        !email ? setEmailError('Please enter email') : !Validations.validateEmail(email) ? setEmailError('Email must be in the format abc@gmail.com') : setEmailError('')
        !password ? setPasswordError('Please enter password') : password?.length < 5 ? setPasswordError('password must be atleast 6 character') : setPasswordError('')
        if (Validations.validateEmail(email) && userName.length > 2 && password.length > 5) {
            return true
        } else return false
    }

    const getAllUsers = async () => {
        getAllOfCollection('Users').then(res => {
            dispatch(allUsers(res))
        })
    }
    const handlesignup = async () => {
        setLoading(true)
        if (Validation()) {
            let USER = {
                user_name: userName,
                email: email,
                password: password,
                profile: profile
            }
            signUp(USER).then(async (res) => {
                setLoading(false)
                if (res) {
                    delete USER.password
                    USER.user_id = res
                    saveData('Users', res, USER)
                    dispatch(user_setup(USER))
                    navigation.navigate(routes.app)
                }
            })
        }
        else {
            console.log('false');
            setLoading(false)
        }
    }

    const openCamera = async () => {
        let image = await FromCamera()
        RBSheet1.current.close()
        let filename = image.path.substring(image.path.lastIndexOf('/') + 1)
        let profilePhoto = await uploadProfileImage(image.path, filename)
        setProfile(profilePhoto)

    }

    const openGallery = async () => {
        let image = await FromGallary()
        RBSheet1.current.close()
        let filename = image.path.substring(image.path.lastIndexOf('/') + 1)
        let profilePhoto = await uploadProfileImage(image.path, filename)
        setProfile(profilePhoto)
    }
    return (
        <Wrappers.Main >
            <ScrollViews.KeyboardAvoiding>
                <Spacers.Spacer height={height(3)} />
                <Texts.MediumTitle style={{ alignSelf: 'center' }}>Sign in</Texts.MediumTitle>
                <Spacers.DoubleBase />
                <Wrappers.Component>
                    <Spacers.DoubleBase />
                    <Images.Round
                        source={profile.path == '' ? appImages.noUser : { uri: profile }}
                        size={totalSize(10)}
                        style={styles.profile} />
                    <Icons.Button
                        buttonStyle={styles.editIcon}
                        iconName={'camerao'}
                        iconType={'antdesign'}
                        iconColor={colors.primary} iconSize={totalSize(1.75)}
                        onPress={() => RBSheet1.current.open()}
                    />

                </Wrappers.Component>
                <Spacers.DoubleBase />
                <TextInputs.Colored placeholder={'Enter name'}
                    value={userName}
                    onChangeText={e => {
                        setUserName(e)
                        setUserNameError('')
                    }}
                    error={userNameError}
                />
                <Spacers.Base />
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
                <BottomSheet.Primary heights={height(25)} onCameraPress={openCamera} onGalleryPress={openGallery} onClosePress={() => RBSheet1.current.close()} innerRef={RBSheet1} />
                <Spacers.Spacer height={height(15)} />
                <Buttons.Colored isLoading={loading} text={'SIGNUP'} onPress={handlesignup} />
                <Spacers.Base />
                <Texts.Medium style={{ alignSelf: 'center' }}>Don't have an account? <Texts.Medium onPress={() => navigation.navigate(routes.signin)} style={{ fontWeight: 'bold' }}>login</Texts.Medium></Texts.Medium>
            </ScrollViews.KeyboardAvoiding>
        </Wrappers.Main>
    )
}

export default SignUp

const styles = StyleSheet.create({
    profile: {
        alignSelf: 'center'
    },
    editIcon: {
        alignSelf: 'center',
        borderRadius: totalSize(5),
        marginTop: -height(3.5),
        left: width(7),
        height: height(3.5),
        width: height(3.5),
        borderRadius: height(1.75),
        elevation: 5,
        backgroundColor: colors.appBgColor1
    },
    button: {
        left: 0,
        right: 0,
        bottom: height(10)
    }
})