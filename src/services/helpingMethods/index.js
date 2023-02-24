import { UIManager, LayoutAnimation, Platform } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import { getAllOfCollection, saveData, uploadProfileImage } from "../../backend/utility";
import { banner_setup, event_setup, user_setup } from "../../redux/actions";
import { routes } from "../constants";


export const FromCamera = async () => {
    let img = false
    try {
        await ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            img = image

        }).catch(er => {
            console.log(er)
            img = false
        })
    } catch (error) {
        img = false
        console.log(error)
    }
    return img
}

export const FromGallary = async () => {
    let img = false
    try {
        await ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            img = image

        }).catch(er => {
            console.log(er)
            img = false
        })
    } catch (error) {
        img = false
        console.log(error)
    }
    return img
}


