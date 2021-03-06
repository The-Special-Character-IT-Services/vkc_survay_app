/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, SafeAreaView, Text, View, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { AuthContext } from 'src/context/authContext';
import Fab from '../../components/Fab';
import SearchItem from '../../components/searchItem/SearchItem';
import PlannedVisits from '../PlannedVisits';
import UnplannedVisits from '../UnplannedVisits';
import VKCLogo from '../../assets/Logo/VKC_Logo.jpg';
import { storeToken } from '../../utils';

const Tab = createMaterialTopTabNavigator();
const date = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const Splash = ({ navigation }) => {
  const { setToken } = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Image style={{ width: 40, height: 40, marginHorizontal: 15 }} source={VKCLogo} />
        <View style={{ flex: 1, marginRight: 10 }}>
          <SearchItem />
        </View>
        <BorderlessButton
          style={{ paddingRight: 10 }}
          onPress={() => {
            Alert.alert(
              "Are you sure you want to log out?",
              "",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => {
                    setToken(null);
                    storeToken(null);
                  } 
                }
              ],
              { cancelable: false }
            );
          }}>
          <Icon name="log-out-outline" size={24} color="red" />
        </BorderlessButton>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text>
          Date :- {date}/{month}/{year}
        </Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Planned Visit" component={PlannedVisits} />
        <Tab.Screen name="Unplanned Visit" component={UnplannedVisits} />
      </Tab.Navigator>
      <Fab onClick={path => navigation.navigate(path)} />
    </SafeAreaView>
  );
};

Splash.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default Splash;
