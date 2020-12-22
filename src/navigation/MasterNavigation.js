/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Splash from '../screens/Splash';
import SurveyQue from '../screens/SurveyQue';
import AddRetailer from '../screens/AddRetailer';
import UnplannedVisit from '../screens/UnplannedVisit';

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  const { colors } = useTheme();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.text,
        title: false,
      }}>
      <MainStack.Screen name="Splash" component={Splash} />
      <MainStack.Screen name="SurveyQue" component={SurveyQue} />
      <MainStack.Screen
        name="AddRetailer"
        component={AddRetailer}
        options={{ headerShown: true, title: 'Add Retailer', headerTitleAlign: 'center' }}
      />
      <MainStack.Screen
        name="UnplannedVisit"
        component={UnplannedVisit}
        options={{ headerShown: true, title: 'Unplanned Visit', headerTitleAlign: 'center' }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
