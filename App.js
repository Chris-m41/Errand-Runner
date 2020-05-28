  import React from 'react';
  import {createAppContainer, createSwitchNavigator} from 'react-navigation';
  import {createStackNavigator} from 'react-navigation-stack';
  import {createBottomTabNavigator} from 'react-navigation-tabs';
  import {FontAwesome, MaterialIcons} from '@expo/vector-icons'; 

  import * as firebase from "firebase";

  import LoginScreen from './screens/LoginScreen';
  import LoadingScreen from './screens/LoadingScreen';
  import RegisterScreen from './screens/RegisterScreen';
  import ProfileScreen from './screens/ProfileScreen';
  import JobsScreen from './screens/JobsScreen';
  import PersonalInfoScreen from './screens/PersonalInfoScreen';
  import AddJob from './screens/AddJob';
  import DisplayJobScreen from './screens/DisplayJob';
  import JobInfoScreen from './screens/JobInfoScreen';
import HireScreen from './screens/HireScreen';
import MessagesScreen from './screens/MessagesScreen';
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC5rJ9su3gLGMnRe202eshbQP8VdONK05Q",
    authDomain: "errand-runner-d1929.firebaseapp.com",
    databaseURL: "https://errand-runner-d1929.firebaseio.com",
    projectId: "errand-runner-d1929",
    storageBucket: "errand-runner-d1929.appspot.com",
    messagingSenderId: "26291406169",
    appId: "1:26291406169:web:5f5d5381d50d9b7d89f848",
    measurementId: "G-4ZJZFQ23PD"
  };
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
  }
   

  const AppTabNavigator = createBottomTabNavigator(
    {
      Jobs: {
        screen: JobsScreen,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <MaterialIcons name='work' size={24} color={tintColor}/>
        }
      },
      Profile: {
        screen: ProfileScreen,     
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <FontAwesome name='user-circle-o' size={24} color={tintColor}/>
        }
      }
    }
  );

  const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Info: PersonalInfoScreen
  });

  export default createAppContainer(
    createSwitchNavigator(
      {
        Loading: LoadingScreen,
        Add: AddJob,
        Display: DisplayJobScreen,
        JobInfo: JobInfoScreen,
        Messages: MessagesScreen,
        Hire: HireScreen,
        App: AppTabNavigator,
        Auth: AuthStack
      },
      {
        initialRouteName: 'Loading'
      }
    )
  );