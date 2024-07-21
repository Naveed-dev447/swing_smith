import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
const CongratulationModal = () => {
  return (
    <View>
        <LottieView
            style={styles.image}
            source={require('../assets/animations/Drum.json')}
            autoPlay
            loop
          />
      <Text>CongratulationModal</Text>
      <Text>Your task has been completed</Text>
    </View>
  )
}

export default CongratulationModal

const styles = StyleSheet.create({
    image: {
        width: wp('90%'),
        height: wp('50%'),
      },
})