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

GoogleSignin.configure({
  webClientId: "883827141283-nso0btis45mnfn95b676dl1o97nmqlfn.apps.googleusercontent.com"
});
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

const App: () => React$Node = () => {
  return (
    <>
      <View>
        <Text>Hello there</Text>
        <GoogleSigninButton
        onPress={signInWithGoogle}
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
//https://console.firebase.google.com/project/auth-project-7ecaf/settings/general/android:com.firebasetestproject
//https://rnfirebase.io/auth/social-auth#google
