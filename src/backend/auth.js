import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import { getData, saveData } from './utility';
import { _storeData } from './AsyncFuncs';
import { Alert } from 'react-native';
import { Error } from '../components/toasts';



export async function signUp(USER) {
  let success = true;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(USER.email, USER.password)
    .then(async user => {
      // user.user.sendEmailVerification();
      // Alert.alert('Account created',`A verification link has been sent to ${email.trim()}\nPlease check your spam folder if not initially found.  Click on the link to verify your email address and then please log into GetN2TechAgain`)
      // delete USER.password;
      success = user.user.uid
      // await saveData('Users', user.user.uid, USER);
      // await AsyncStorage.setItem('Token', user.user.uid)
    })
    .catch(function (error) {
      success = false;
      Error(error.code + ': ' + error.message);
    });
  return success;
}

export async function signIn(email, password, rememberme) {
  let success = false;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      if (rememberme) {
        AsyncStorage.setItem('Token', user.user.uid);
      }
      success = user.user.uid
    })
    .catch(function (error) {
      console.log(error.code, error.message)
      success = false;

      if (error.code === 'auth/user-not-found') {
        Error("The information provided does not match our records. Please try again");
        console.log("The information provided does not match our records. Please try again");
      }
      else if (error.code === 'auth/wrong-password') {
        Error("The password is invalid or the user does not have a password.");
        console.log("The password is invalid or the user does not have a password");

      }
      else if (error.code === 'auth/unknown') {
        Error("A network error (such as timeout, interrupted connection or unreachable host) has occurred");
        console.log("A network error (such as timeout, interrupted connection or unreachable host) has occurred");

      }

      else {
        Error(error.message)
        console.log('error.message', error.message);
      }

    });
  return success;
}

export function getCurrentUserId() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    return user.uid;
  }
  else {
    return false
    // Error('Session expired, please login again to continue')
  }
}

export async function logout() {
  await firebase.auth().signOut().catch(error => console.log(error.code, ' ', error.message));
}

export async function ResetPassword(email) {
  let success = true
  await firebase
    .auth().sendPasswordResetEmail(email)
    .then(function (user) {
      success = true
      // alert('Please check your email...', user)
    }).catch(function (e) {
      // console.log(e)
      success = e.message
    })
  return success
}



