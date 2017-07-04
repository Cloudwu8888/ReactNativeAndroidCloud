/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import MobileCenter from 'mobile-center';
import Analytics from "mobile-center-analytics";
import Crashes from "mobile-center-crashes";
import Push from "mobile-center-push";
import React, { Component } from 'react';
import {
  AppState,
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

Analytics.trackEvent("My first event");
export default class MyFirstReactNative extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button
            title="crash" 
            onPress={onCrash}
        >    
        </Button>
      </View>
    );
  }
}
function onCrash(){
    throw new Error("This is a test JavaScript Crash"); 
}
//generateTestCrash

Push.setEventListener({
  pushNotificationReceived: function (pushNotification) {
    let message = pushNotification.message;
    let title = pushNotification.title;

    if (message === null || message === undefined) {
      // Android messages received in the background don't include a message. On Android, that fact can be used to
      // check if the message was received in the background or foreground. For iOS the message is always present.
      title = "Android background";
      message = "<empty>";
    }

    // Custom name/value pairs set in the Mobile Center web portal are in customProperties
    if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
      message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
    }

    if (AppState.currentState === 'active') {
      Alert.alert(title, message);
    }
    else {
      // Sometimes the push callback is received shortly before the app is fully active in the foreground. This
      // only seems to happen on Android, not iOS. In this case you'll want to save off the notification info
      // and wait until the app is fully shown in the foreground before displaying any UI. You could
      // use AppState.addEventListener to be notified when the app is fully in the foreground.
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyFirstReactNative', () => MyFirstReactNative);
