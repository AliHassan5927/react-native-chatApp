import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Icons, Images, ScrollViews, Spacers, Texts, Wrappers } from '../../../components'
import { height } from 'react-native-dimension'
import { appImages, routes } from '../../../services'
import { logout } from '../../../backend/auth'
import { useSelector } from 'react-redux'
import { totalSize } from 'react-native-dimension'

const Home = ({ navigation }) => {

    const allUser_redus = useSelector(state => state.allUsers)
    const user_redux = useSelector(state => state.user)
    const [user, setUser] = useState(user_redux)
    const [allUsers, setAllUser] = useState(allUser_redus)

    const handleLogout = async () => {
        await logout()
        navigation.replace(routes.auth)
    }

    return (
        <Wrappers.Main style={styles.container}>
            <Wrappers.Primary style={styles.logout} >
                <Images.Primary size={totalSize(12)} onPress={handleLogout} source={appImages.logout} />
            </Wrappers.Primary>
            <Spacers.Spacer height={height(35)} />
            <Texts.Large style={{ textAlign: 'center', color: 'black', }}>Click on below button to chat with your friend.</Texts.Large>
            <Wrappers.Absolute style={styles.chat} >
                <Images.Primary onPress={() => navigation.navigate(routes.allUsers)} style={{}} source={appImages.chat} />
            </Wrappers.Absolute>
        </Wrappers.Main>
    )
}

export default Home

const styles = StyleSheet.create({
    logout: {
        top: 40,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    chat: {
        bottom: 40,
        right: 30
    }

})