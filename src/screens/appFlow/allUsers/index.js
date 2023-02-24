import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Images, Spacers, Texts, Wrappers } from '../../../components'
import { appImages, routes } from '../../../services'
import { getAllFriends, getAllOfCollection, uniqueID } from '../../../backend/utility'
import { useSelector } from 'react-redux'

const AllUsers = ({ navigation }) => {
    const allUser_redux = useSelector(state => state.allUsers)
    const user_redux = useSelector(state => state.user)

    const [allContacts, setAllContacts] = useState(allUser_redux)
    const [user, setUser] = useState(user_redux)

    useEffect(() => {
        setUser(user_redux)
    }, [user_redux])

    useEffect(() => {
        let filteredContacts = allContacts?.filter(res => { return res?.user_id != user?.user_id })
        setAllContacts(filteredContacts)
    }, [])


    const onPressChatUser = (selectedUser) => {
        let room_id = uniqueID()
        getAllFriends('Chat', 'key', user?.user_id).then(res => {
            if (res?.length == 0) {
                navigation.navigate(routes.chat, {
                    room_id: room_id,
                    receiver: selectedUser,
                    sender: user
                })
            } else {
                const already_chated = res?.find(i => {
                    return i?.key?.filter(re => re === selectedUser?.user_id).length > 0;
                })
                if (already_chated) {
                    room_id = already_chated?.room_id,
                        navigation.navigate(routes.chat, {
                            room_id: room_id,
                            receiver: selectedUser,
                            sender: user
                        })
                } else {
                    room_id = uniqueID();
                    navigation.navigate(routes.chat, {
                        room_id: room_id,
                        receiver: selectedUser,
                        sender: user
                    })

                }
            }
        })


    }

    const renderUsers = ({ item }) => {
        return (
            <TouchableOpacity style={styles.rowWrapper} onPress={() => onPressChatUser(item)}>
                <Wrappers.RowBasic>
                    <Images.Round source={item?.profile.length > 1 ? { uri: item?.profile } : appImages.noUser} />
                    <Texts.SmallTitle style={styles.name}>{item?.user_name}</Texts.SmallTitle>
                </Wrappers.RowBasic>
            </TouchableOpacity>
        )
    }
    return (
        <Wrappers.Main>
            <Spacers.Base />
            <Wrappers.Component>

                <FlatList
                    // data={allUsers}
                    data={allContacts}
                    renderItem={renderUsers}
                    keyExtractor={item => item.id} />
            </Wrappers.Component>
        </Wrappers.Main>
    )
}

export default AllUsers

const styles = StyleSheet.create({
    rowWrapper: {
        marginVertical: 10
    },
    name: {
        marginLeft: 20
    }
})