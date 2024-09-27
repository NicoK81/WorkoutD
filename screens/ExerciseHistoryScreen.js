import React, { useContext } from 'react';
import { View, Text, FlatList, } from 'react-native';
import { WorkoutContext } from './WorkoutContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from '../Styles/style'; 

export default function ExerciseHistoryScreen() {
  const { workouts, unit } = useContext(WorkoutContext);

 
  const convertDistance = (distance) => {
    return unit === 'miles' ? (distance / 1.60934).toFixed(2) : distance.toFixed(2);
  };

  const sumDistancesBySport = (sport) => {
    return workouts
      .filter((workout) => workout.sport === sport)
      .reduce((sum, workout) => sum + (unit === 'miles' ? workout.distance / 1.60934 : workout.distance), 0)
      .toFixed(2);
  };

  const renderWorkout = ({ item }) => (
    <View style={style.workoutItem}>
      <View style={style.iconContainer}>{getSportIcon(item.sport)}</View>
      <View>
        <Text>Sport: {item.sport}</Text>
        <Text>Distance: {convertDistance(item.distance)} {unit}</Text>
        <Text>Duration: {item.duration} minutes</Text>
        <Text>Date: {new Date(item.date).toDateString()}</Text>
      </View>
    </View>
  );

  const getSportIcon = (sport) => {
    switch (sport) {
      case 'Running':
        return <FontAwesome5 name="running" size={24} color="#900" />;
      case 'Cycling':
        return <FontAwesome name="bicycle" size={24} color="#900" />;
      case 'Swimming':
        return <FontAwesome5 name="swimmer" size={24} color="#900" />;
      case 'Walking':
        return <FontAwesome5 name="walking" size={24} color="#900" />;
      default:
        return null;
    }
  };

  return (
    <View style={style.container}>
      <Text>Total Running Distance: {sumDistancesBySport('Running')} {unit}</Text>
      <Text>Total Cycling Distance: {sumDistancesBySport('Cycling')} {unit}</Text>
      <Text>Total Swimming Distance: {sumDistancesBySport('Swimming')} {unit}</Text>
      <Text>Total Walking Distance: {sumDistancesBySport('Walking')} {unit}</Text>

      <FlatList
        data={workouts}
        renderItem={renderWorkout}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

