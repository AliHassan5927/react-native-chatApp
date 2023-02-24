import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { height, totalSize, width } from 'react-native-dimension';
import {
    Wrappers,
    Spacers,
    TextInputs,
    Buttons,
    Headers,
    Texts,
    Toasts,
} from '../../../components';
import { colors, routes } from '../../../services';
import { ResetPassword } from '../../../backend/auth';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        if (email.length > 0) {
            ResetPassword(email)
                .then(e => {
                    if (e == true) {
                        Toasts.Success('Please check your email.')
                    } else {
                        Toasts.Success(e)
                    }
                })
        } else {
            Toasts.Success('Please enter Email')
        }
    }
    return (
        <Wrappers.Main style={styles.main}>
            <Headers.Primary />
            <Spacers.Spacer height={height(3.5)} />
            <Wrappers.Component>
                <Texts.Large>FORGOT PASSWORD!</Texts.Large>
                <Texts.Medium>To reset your password, enter the email address you used to sign up.</Texts.Medium>
            </Wrappers.Component>
            <Spacers.Base />
            <TextInputs.Colored
                placeholder="Email Address"
                value={email}
                onChangeText={c => setEmail(c)}
                borderColor
            />
            <Spacers.Spacer height={height(3.5)} />
            <Buttons.Colored onPress={handleForgotPassword} text="SEND RESET LINK!" />
            <Spacers.Base />
            <Buttons.Bordered text={'BACK TO LOGIN'} onPress={() => navigation.navigate(routes.signin)} />
            <Spacers.Spacer height={height(20)} />
            <Texts.TinyTitle style={styles.contactUs}>
                Having problems? Contact Mug Club Support at: <Texts.TinyTitle onPress={() => Linking.openURL('mailto:mugclub@theuob.com')} style={styles.siteText}>mugclub@theuob.com</Texts.TinyTitle> {'\n'}(916) 996 - 3494
            </Texts.TinyTitle>

        </Wrappers.Main>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.blue,
    },
    contactUs: {
        color: colors.snow,
        fontSize: totalSize(1.5),
        textAlign: 'center',
        marginHorizontal: width(5)
    },
    siteText: {
        color: colors.snow,
        fontSize: totalSize(1.5),
        textAlign: 'center',
        marginHorizontal: width(5),
        textDecorationLine: 'underline'
    }

})