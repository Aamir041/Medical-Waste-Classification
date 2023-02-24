import { View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ justifyContent: 'center', alignItems: 'center',marginLeft:"27%"}}>Academic Notification App</Text>
    </View>
  )
}

export default Header