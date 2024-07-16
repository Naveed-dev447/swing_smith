import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import * as Progress from 'react-native-progress';
import CustomHeader from '../../shared/Component/CustomHeader';
import {goBack} from '../../shared/Utils/navigationRef';
import CustomButton from '../../shared/Component/CustomButton';
import globalStyles from '../Onboarding/styles';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
const VideoUpload5 : React.FC = (props: any) => {
    const { navigation } = props;
  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title="Analysing" />
      <View style={styles.progressBarContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.analyzingScore}>38%</Text>
          <Text style={styles.analyzingText}>Analyzing</Text>
        </View>
        <Progress.Bar
          progress={0.38}
          width={null}
          style={styles.progressBar}
          color="#BBF246"
          unfilledColor="#ffff"
          borderWidth={0.5}
        />
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../../assets/Images/importSwing.png')}
          style={styles.image}
          resizeMode="stretch"></ImageBackground>
      </View>
      <View style={styles.tipContainer}>
        <ImageBackground
          source={require('../../assets/Images/AnalyzingTip.png')}
          style={styles.tipImage}
          resizeMode="center"></ImageBackground>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Next"
          onPress={() => navigation.navigate('BottomTabStack')}
        />
      </View>
    </View>
  );
};

export default VideoUpload5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  progressBarContainer: {
    marginTop: 20,
  },
  analyzingScore: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  analyzingText: {
    fontSize: 14,
    color: 'black',
  },
  progressBar: {
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 10,
    // marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  tipContainer: {
    marginBottom: 10,
    marginLeft: 15,
  },
  tipImage: {
    width: '100%',
    height: 300,
  },
  tipOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
  },
  tipTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  buttonContainer: {
    bottom: wp('4%'),
  },
});
