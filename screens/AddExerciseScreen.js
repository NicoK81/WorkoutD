import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, } from 'react-native';
import { WorkoutContext } from './WorkoutContext';
import { Calendar } from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from '../Styles/style';

export default function AddExerciseScreen() {
  const { workouts, setWorkouts, unit } = useContext(WorkoutContext);
  const [sport, setSport] = useState('Running');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCalendar, setShowCalendar] = useState(false);

  
  const [open, setOpen] = useState(false); 
  const [value, setValue] = useState('Select'); 
  const [items, setItems] = useState([
    {
      label: 'Running',
      value: 'Running',
      icon: () => <FontAwesome5 name="running" size={18} color="#900" />,
    },
    {
      label: 'Cycling',
      value: 'Cycling',
      icon: () => <FontAwesome name="bicycle" size={18} color="#900" />,
    },
    {
      label: 'Swimming',
      value: 'Swimming',
      icon: () => <FontAwesome5 name="swimmer" size={18} color="#900" />,
    },
    {
      label: 'Walking',
      value: 'Walking',
      icon: () => <FontAwesome5 name="walking" size={18} color="#900" />,
    },
  ]);

  const addWorkout = () => {
    const numericDistance = parseFloat(distance);
    const numericDuration = parseFloat(duration);

    if (numericDistance <= 0 || numericDuration <= 0) {
      Alert.alert('Error', 'Distance and duration must be positive numbers.');
      return;
    }

    const workout = {
      sport: value, 
      distance: unit === 'miles' ? numericDistance * 1.60934 : numericDistance,
      duration: numericDuration,
      date,
    };

    setWorkouts([...workouts, workout]);
    Alert.alert('Success', 'Workout added successfully!');
    setDistance('');
    setDuration('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <View style={style.container}>
      <Text style={style.label}>Sport:</Text>

      {/* DropDownPicker component */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select Sport"
        style={style.dropdown}
        showArrowIcon={true}
      />

      <Text style={style.labelEX}>Distance ({unit}):</Text>
      <TextInput
        style={style.input}
        value={distance}
        onChangeText={setDistance}
        keyboardType="numeric"
        placeholder="Enter Distance"
      />

      <Text style={style.labelEX}>Duration (minutes):</Text>
      <TextInput
        style={style.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Enter Duration"
      />

      <Text style={style.labelEX}>Date: {date}</Text>
      <Button title="Select Date" onPress={() => setShowCalendar(!showCalendar)} />
      {showCalendar && (
        <Calendar
          current={date}
          onDayPress={(day) => {
            setDate(day.dateString);
            setShowCalendar(false);
          }}
          markedDates={{
            [date]: { selected: true, selectedColor: 'blue' },
          }}
        />
      )}

      <Button title="Add Workout" onPress={addWorkout} />
    </View>
  );
}


