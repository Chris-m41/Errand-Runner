  import {createAppContainer, createSwitchNavigator} from 'react-navigation';
  import {createStackNavigator} from 'react-navigation-stack';

  import * as firebase from "firebase";

  import HomeScreen from './screens/HomeScreen';
  import LoginScreen from './screens/LoginScreen';
  import LoadingScreen from './screens/LoadingScreen';
  import RegisterScreen from './screens/RegisterScreen';
  
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
  }

  const AppStack = createStackNavigator({
    Home: HomeScreen
  });

  const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
  });

  export default createAppContainer(
    createSwitchNavigator(
      {
        Loading: LoadingScreen,
        App: AppStack,
        Auth: AuthStack
      },
      {
        initialRouteName: 'Loading'
      }
    )
  );