/* import * as React from 'react'; */
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { Camera } from 'expo-camera';
import { ActivityIndicator } from 'react-native';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const webViewRef = useRef(null);
  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color="#f29900" />
    </View>
  );

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
        source={{ uri: 'http://app-www.ronde-de-l-espoir.fr' }}
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
        renderLoading={Spinner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
