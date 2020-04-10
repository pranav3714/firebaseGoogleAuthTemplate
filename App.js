/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import auth from '@react-native-firebase/auth';
import googleWebClientId from "./googlekey";
import rootReducer from "./redux/reducer";
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";

GoogleSignin.configure({
  webClientId: googleWebClientId
});
const store = createStore(rootReducer)

let signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    let googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken)
    console.log(await auth().signInWithCredential(googleCredential));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log("SIGN_IN_CANCELLED");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("IN_PROGRESS");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("PLAY_SERVICES_NOT_AVAILABLE");
    } else {
      console.log(error);
    }
  }
};

const NewComponent: () => React$Node = () => {
  const dispatch = useDispatch()
  //console.log(useSelector(states => console.log(states)));
  const counterVal = useSelector(states => states.counter)
  const login = useSelector(states => states.isLogin)
  return (
      <View>
        <Text>{counterVal}</Text>
        <Button title="Increment" onPress={() => dispatch({type: "INCREMENT"})} />
        <Button title="Decrement" onPress={() => dispatch({type: "DECREMENT"})} />
        {login ? <Button title="SIGN OUT" color="red" onPress={() => dispatch({type: "SIGN_OUT"})} /> : <Button title="SIGN IN" onPress={() => dispatch({ type: "SIGN_IN", payload: {jwt: "random token id"}}) } />}
      </View>
  )
};

const App: () => React$Node = () => {
  return (
        <Provider store={store}>
          <View>
            <Text>Hello there</Text>
            <GoogleSigninButton
            onPress={signInWithGoogle}
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            />
            <NewComponent />
          </View>
        </Provider>
  )
};

const styles = StyleSheet.create({

});

export default App;
//https://console.firebase.google.com/project/auth-project-7ecaf/settings/general/android:com.firebasetestproject
//https://rnfirebase.io/auth/social-auth#google
