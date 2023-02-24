import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import { Error } from '../components/toasts';
export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function uploadProfileImage(uri, name) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref =
      storage()
        .ref(name);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => { },
        err => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
}


export async function saveData(collection, doc, jsonObject) {
  const success =
    await firebase.firestore()
      .collection(collection)
      .doc(doc)
      .set(jsonObject, { merge: true }).then(() => {
        return true;
      }).catch(function (error) {
        Error(error.message)
        return false;
      });
}

export async function addToArray(collection, doc, array, value) {
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  } else {
    saveData(collection, doc, { [array]: [value] });
  }
}

export async function addToArrayCustom(collection, doc, array, value) {
  let success = true
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
      last_message_time: value.createdAt
    });
    success = true
  } else {
    success = false
  }
  return success
}

export const getAllFriends = async (collection, key, value) => {
  let querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .where(key, 'array-contains', value)
    .get();
  let data = await querySnapshot?.docs?.map((doc) => {
    return doc.data()
  })
  return data;
}

export function uniqueID() {
  function chr4() {
    return Math.random()
      .toString(16)
      .slice(-4);
  }
  return (
    chr4() +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    chr4() +
    chr4()
  );
}

export default firebase;


