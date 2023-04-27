/* import * as React from 'react'; */
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { Camera } from 'expo-camera';
import * as NavigationBar from 'expo-navigation-bar';
import * as StatusBar from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const webViewRef = useRef(null);
  SplashScreen.preventAutoHideAsync();
  NavigationBar.setBackgroundColorAsync('white')
  NavigationBar.setButtonStyleAsync('dark')
  StatusBar.setStatusBarBackgroundColor('white', false)
  StatusBar.setStatusBarStyle('dark')
  StatusBar.setStatusBarTranslucent(false)

  const finishedLoading = async () => {
    setTimeout(function(){
      NavigationBar.setBackgroundColorAsync('#0b142c')
      NavigationBar.setButtonStyleAsync('light')
      SplashScreen.hideAsync()
      StatusBar.setStatusBarBackgroundColor('#0b142c', false)
      StatusBar.setStatusBarStyle('light')
      StatusBar.setStatusBarTranslucent(false)
    }, 3000)
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    const backAction = () => {
      webViewRef.current.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (

    <View style={styles.container}>
      <WebView
        source={{ uri: 'http://app-www.ronde-de-l-espoir.fr/login/login.php' }}
        ref={webViewRef}
        style={styles.view}
        originWhitelist={['*']}
        allowsInlineMediaPlayback
        javaScriptEnabled
        scalesPageToFit
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabledAndroid
        useWebkit
        startInLoadingState={true}
        onLoad={finishedLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
