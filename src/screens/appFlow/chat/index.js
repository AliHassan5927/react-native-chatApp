import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Headers, Icons, Images, Spacers, Wrappers } from '../../../components'
import { Actions, Bubble, Composer, GiftedChat, InputToolbar, Send, Time } from 'react-native-gifted-chat';
import { width, totalSize } from 'react-native-dimension'
import { appImages, colors } from '../../../services';
import { Icon } from 'react-native-elements';
import { addToArrayCustom, uniqueID } from '../../../backend/utility';
import { firebase } from '@react-native-firebase/auth';

import { saveData } from '../../../backend/utility';

const Chat = ({ navigation, route }) => {

    const { room_id, receiver, sender } = route?.params

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsub = firebase
            .firestore()
            .collection('Chat')
            .doc(route?.params?.room_id)
            .onSnapshot(doc => {
                if (doc.exists) {
                    const msgs = doc?.data();
                    setMessages(msgs['messages'].reverse());
                }
            })
        return () => unsub();
    }, [])

    const onSend = useCallback((messages = []) => {

        setMessages(previousMessage =>
            GiftedChat.append(previousMessage, messages)
        );
        messages[0]._id = uniqueID();
        messages[0].createdAt = Date.parse(messages[0].createdAt);
        messages[0].receiver_id = receiver?.user_id;

        addToArrayCustom('Chat', room_id, 'messages', messages[0]).then(res => {
            console.log(res);
            if (!res) {
                let obj = {
                    key: [sender?.user_id, receiver?.user_id],
                    last_message_time: messages[0]?.createdAt,
                    ['messages']: [messages[0]],
                    room_id: room_id,
                    user: [
                        {
                            _id: receiver?.user_id,
                            user_name: receiver?.user_name ?? '',
                            profile_photo: receiver?.profile ?? ''
                        },
                        {
                            _id: sender?.user_id,
                            user_name: sender?.first_name ?? '',
                            profile_photo: sender?.profile ?? ''
                        }
                    ]
                }
                console.log('objjj', obj);
                saveData('Chat', room_id, obj).then(res => {

                }).catch(err => {

                })
            }
            else {
                console.log('elseee');
            }
        })

    })

    const renderInputToolBar = (props) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
            }}>
                <InputToolbar {...props} />
                <TouchableOpacity
                    style={{ padding: 10, marginLeft: 10 }}
                >
                    <Icon name="attachment" type='entypo' size={20} color="#4F8EF7" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ padding: 10, marginRight: width(20) }}
                    onPress={() => console.log('Camera button pressed')}
                >
                    <Icon name="camera" type='feather' size={20} color="#4F8EF7" />
                </TouchableOpacity>
            </View>
        )
    }

    const renderAvatar = () => {
        return (
            <Images.Round source={receiver?.profile?.path ? { uri: receiver?.profile?.path } : appImages.noUser} />
        )
    }

    const renderTime = props => {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    left: {
                        color: colors.appBgColor1,
                        fontSize: 10,
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'right',
                    },
                    right: { color: colors.appBgColor1, fontSize: 10, },
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send
                alwaysShowSend={true}
                {...props}
            >
                <View style={{ marginRight: width(2.5) }}>
                    <Icons.Button buttonStyle={{ backgroundColor: colors.primary }} onPress={() => props.text.trim().length > 0 ? (props.onSend({ text: props.text }, true)) : null} iconName={'send'} iconType={'font-awesome'} iconSize={totalSize(2.3)} iconColor={colors.appBgColor1} />

                </View>
            </Send>
        )

    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: colors.primary,
                        padding: 5,

                    },
                    left: {
                        backgroundColor: colors.appBgColor4,
                        padding: 5,
                    }
                }}
                textStyle={{
                    right: {
                        fontFamily: 'Axiforma-Regular',
                        color: colors.appBgColor1
                    },
                    left: {
                        fontFamily: 'Axiforma-Regular',
                        color: colors.appBgColor1

                    }
                }}
            />
        )
    }


    return (
        <Wrappers.Main>
            <Spacers.Base />
            <Headers.Primary onPress={() => navigation.goBack()} userName={receiver?.user_name} />
            <GiftedChat
                renderInputToolbar={renderInputToolBar}
                renderAvatar={renderAvatar}
                renderBubble={renderBubble}
                renderSend={renderSend}
                renderTime={renderTime}
                multiline
                textInputStyle={{ marginLeft: width(2), paddingLeft: width(12), marginRight: width(2), borderRadius: totalSize(1), backgroundColor: colors.bgColor10 }}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: sender?.user_id,
                }}
            />
        </Wrappers.Main>
    )

}
export default Chat

