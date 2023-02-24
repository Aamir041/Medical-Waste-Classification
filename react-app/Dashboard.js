import { View, Text } from 'react-native'
import React from 'react'
import WeeklyCalendar from 'react-native-weekly-calendar';
import sampleEvents from "./dates"

export const Dashboard = () => {


  return (
    <View>
      <WeeklyCalendar events={sampleEvents} style={{ height: "100%" }} />
    </View>
  );
}
