import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import S from '../screens/S';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name='HOME'
            component={S}
            />
            <Stack.Screen
            name='Login'
            component={Login}
            />


        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default MainNavigation