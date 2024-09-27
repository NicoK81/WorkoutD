import React, { useContext } from 'react';
import { View, Text,  } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { WorkoutContext } from './WorkoutContext'; 
import style from '../Styles/style';

export default function SettingsScreen() {
  const { unit, setUnit } = useContext(WorkoutContext);

  return (
    <View style={style.container}>
      <Text style={style.label}>Choose Unit:</Text>
      <RadioButton.Group onValueChange={(newUnit) => setUnit(newUnit)} value={unit}>
        <View style={style.radioContainer}>
          <Text>Kilometers</Text>
          <RadioButton value="km" />
        </View>
        <View style={style.radioContainer}>
          <Text>Miles</Text>
          <RadioButton value="miles" />
        </View>
      </RadioButton.Group>
    </View>
  );
}

