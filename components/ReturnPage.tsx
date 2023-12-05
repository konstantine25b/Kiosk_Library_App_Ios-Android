import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'


export default function ReturnPage() {

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    
    // Revert the status bar text color to default when the component unmounts
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);
  return (
    <View>
      <Text>ReturnPage</Text>
    </View>
  )
}