// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect, Suspense } from 'react';
import { firebase } from './config.js';
import Header from './Header';
import Login from './Login';
import { Dashboard } from "./Dashboard"



const Stack = createStackNavigator();

function App() {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    // console.log("Hum User Effect se");
    return subscriber;
  }, []); 

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => <Header name="AS Devs" />,
          headerStyle: {
            height: 150,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25
          }
        }}
      />
    </Stack.Navigator>
  )
}


export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
