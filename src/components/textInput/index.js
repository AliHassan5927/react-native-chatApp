import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import { Spacers, Texts, Wrappers } from '..';
const Colored = ({ iconName, iconType, onPressIcon, placeholder, onFocus, onBlur, onChangeText, secureTextEntry, value, containerStyle, borderColor, error }) => {
    return (
        <TouchableOpacity activeOpacity={1}>

            <View style={[appStyles.inputContainerColored, {
                borderRadius: 15,
                backgroundColor: colors.appBgColor2, borderColor: borderColor ? colors.gold : null, borderWidth: borderColor ? 2 : 0,
            }, appStyles.shadow, containerStyle]}>

                <Wrappers.RowBasic style={{ flex: 1, marginHorizontal: width(2), justifyContent: 'space-between' }}>
                    <TextInput
                        onChangeText={onChangeText}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor={colors.gray}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        secureTextEntry={secureTextEntry}
                        style={[appStyles.inputField, { width: width(75), height: height(7), paddingHorizontal: sizes.marginHorizontal / 2 }]}
                    />
                    {
                        iconName ?
                            <View style={{ marginLeft: sizes.marginHorizontal / 2 }}>
                                <Icon name={iconName} type={iconType} onPress={onPressIcon} size={totalSize(2.5)} color={colors.appTextColor5} iconStyle={{ marginRight: width(3), }} />
                            </View>
                            :
                            null
                    }
                </Wrappers.RowBasic>
            </View>
            {error ? (
                <Wrappers.Primary animation="shake">
                    <Spacers.Tiny />
                    <Texts.Small style={[{ color: colors.error, textAlign: 'left', marginHorizontal: width(5) }]}>
                        {`⚠ ${error}`}
                    </Texts.Small>
                </Wrappers.Primary>
            ) : null}

        </TouchableOpacity>

    );
}
const Search = ({ iconName, iconType, onPressIcon, placeholder, onFocus, onBlur, onChangeText, secureTextEntry, value, containerStyle }) => {
    return (
        <View style={[appStyles.inputContainerColored, {
            borderRadius: 50,
            backgroundColor: colors.appBgColor5, borderColor: colors.borderColor1, borderWidth: 1
        }, containerStyle]}>

            <Wrappers.RowBasic style={{ flex: 1, marginHorizontal: width(2), justifyContent: 'space-between' }}>
                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    cursorColor={colors.veniceBlue}
                    secureTextEntry={secureTextEntry}
                    style={[appStyles.inputField, { width: width(75), height: height(6), paddingHorizontal: sizes.marginHorizontal / 2 }]}
                />
                {
                    iconName ?
                        <View style={{ marginLeft: sizes.marginHorizontal / 2 }}>
                            <Icon name={iconName} type={iconType} onPress={onPressIcon} size={totalSize(2.5)} color={colors.iconColor1} iconStyle={{}} />
                        </View>
                        :
                        null
                }
            </Wrappers.RowBasic>


        </View>
    );
}
const Bordered = ({ iconName, iconType, placeholder, placeholderTextColor, onFocus, onChangeText, secureTextEntry, value, containerStyle, inputStyle }) => {
    return (
        <View style={[appStyles.inputContainerBorderd, {
            borderRadius: sizes.inputRadius,
            borderWidth: 1,
            borderColor: colors.appColor1
        }, containerStyle]}>
            {
                iconName ?
                    <View style={{ marginLeft: sizes.marginHorizontal / 2 }}>
                        <Icon name={iconName} type={iconType} size={totalSize(2.5)} color={colors.appColor1} iconStyle={{}} />
                    </View>
                    :
                    null
            }
            <View style={{ flex: 1 }}>
                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    style={[appStyles.inputField, { width: null, height: height(7), paddingHorizontal: sizes.marginHorizontal / 2 }, inputStyle]}
                />
            </View>
        </View>
    );
}

export { Colored, Bordered, Search }