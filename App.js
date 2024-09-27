// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddExerciseScreen from './screens/AddExerciseScreen';
import ExerciseHistoryScreen from './screens/ExerciseHistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import { WorkoutContext } from './screens/WorkoutContext';
import style from './Styles/style';

const Tab = createBottomTabNavigator();

export default function App() {
  const [workouts, setWorkouts] = useState([
    { sport: 'Running', distance: 5, duration: 30, date: new Date() },
    { sport: 'Cycling', distance: 15, duration: 60, date: new Date() },
    { sport: 'Swimming', distance: 1, duration: 20, date: new Date() },
    { sport: 'Walking', distance: 6, duration: 60, date: new Date() },
  ]);
  const [unit, setUnit] = useState('km'); // 'km' or 'miles'

  return (
    <PaperProvider style={style.container} theme={MD3DarkTheme}>
      <WorkoutContext.Provider value={{ workouts, setWorkouts, unit, setUnit }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Add Exercise') {
                  iconName = 'plus-circle'; 
                } else if (route.name === 'Exercise History') {
                  iconName = 'history'; 
                } else if (route.name === 'Settings') {
                  iconName = 'cog'; 
                }

                return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'black',
            })}
          >
            <Tab.Screen name="Add Exercise" component={AddExerciseScreen} />
            <Tab.Screen name="Exercise History" component={ExerciseHistoryScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </WorkoutContext.Provider>
    </PaperProvider>
  );
}

