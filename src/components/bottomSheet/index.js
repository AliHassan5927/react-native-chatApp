import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { height, totalSize, width } from 'react-native-dimension';
import { Icons, Spacers, Texts, Wrappers } from '..';
import { appIcons, colors, routes } from '../../services';


export const Primary = ({ navigation, innerRef, heights, onCameraPress, onGalleryPress, onClosePress }) => {
    const RBSheet1 = useRef();

    return (
        <RBSheet
            ref={innerRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={heights}
            customStyles={{

                draggableIcon: {
                    backgroundColor: colors.darkBlue
                },
                container: {
                    backgroundColor: '#fff',
                    borderTopLeftRadius: totalSize(2.5),
                    borderTopRightRadius: totalSize(2.5),
                }
            }}
        >
            <View style={{ marginHorizontal: width(5), }}>
                <Wrappers.Primary style={{ alignItems: 'flex-end', }}>
                    <Icons.Button
                        iconName={'close'}
                        iconType={'antdesign'}
                        iconColor={colors.appBgColor1}
                        buttonColor={colors.primary}
                        buttonStyle={{ height: height(4), width: height(4), borderRadius: height(2) }}
                        iconSize={totalSize(2.4)}
                        onPress={onClosePress}
                    />
                </Wrappers.Primary>
                <Spacers.Small />
                <Wrappers.RowBasic>
                    <Wrappers.Primary style={{ marginRight: width(4) }}>
                        <Icons.Button
                            iconName={'camera'}
                            iconType={'feather'}
                            iconColor={colors.appBgColor1}
                            buttonColor={colors.primary}
                            buttonStyle={{ height: height(5), width: height(5), borderRadius: height(2.5) }}
                            iconSize={totalSize(2.1)}
                        />
                    </Wrappers.Primary>
                    <Wrappers.Primary>
                        <TouchableOpacity onPress={onCameraPress}>
                            <Texts.Medium style={{ fontFamily: 'Axiforma-Medium', color: colors.textColor1 }}>Open Camera</Texts.Medium>
                        </TouchableOpacity>

                    </Wrappers.Primary>

                </Wrappers.RowBasic>
                <Spacers.Base />
                <Wrappers.RowBasic>
                    <Wrappers.Primary style={{ marginRight: width(4) }}>
                        <Icons.Button
                            iconName={'photo'}
                            iconType={'font-awesome'}
                            iconColor={colors.appBgColor1}
                            buttonColor={colors.primary}
                            buttonStyle={{ height: height(5), width: height(5), borderRadius: height(2.5) }}
                            iconSize={totalSize(2.1)}
                        />
                    </Wrappers.Primary>
                    <Wrappers.Primary>
                        <TouchableOpacity onPress={onGalleryPress}>
                            <Texts.Medium style={{ fontFamily: 'Axiforma-Medium', color: colors.textColor1 }}>Select from gallery</Texts.Medium>
                        </TouchableOpacity>
                    </Wrappers.Primary>


                </Wrappers.RowBasic>
                <Spacers.Base />


            </View>
        </RBSheet >
    )
}

const styles = StyleSheet.create({})