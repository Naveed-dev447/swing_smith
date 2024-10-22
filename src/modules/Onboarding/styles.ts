import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    // paddingBottom: hp('10%'),
    marginTop: hp('3%'),
  },
  title: {
    color: '#282E34',
    fontFamily: 'Outfit-Bold',
    fontSize: wp('6%'),
    marginVertical: hp('2%'),
  },
  subTitle: {
    color: '#282E34',
    fontFamily: 'Outfit-Regular',
    fontSize: wp('4.2%'),
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
  },
  extraDetail: {
    color: '#282E34',
    fontFamily: 'Outfit-Regular',
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
  },
  levelButton: {
    backgroundColor: '#E8E8E8',
    padding: hp('4%'),
    alignItems: 'center',
    borderRadius: 10,
    width: wp('43%'),
    marginVertical: hp('1%'),
  },
  selectedLevelButton: {
    backgroundColor: '#ADFF2F',
  },
  levelText: {
    fontSize: wp('4%'),
    color: '#000',
  },
  selectedLevelText: {
    color: '#000',
  },
  optionContainer: {
    marginVertical: hp('2%'),
  },
  optionButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: hp('1%'),
    flexDirection: 'row',
  },
  selectedOptionButton: {
    backgroundColor: '#ADFF2F',
  },
  optionText: {
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Regular',
    color: '#192126',
    marginLeft: wp('2%'),
  },
  selectedOptionText: {
    fontFamily: 'Outfit-Regular',
    color: '#192126',
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    fontSize: wp('3%'),
    // marginLeft:10,
    textAlign: 'center',

    marginTop: hp('1%'),
  },
  optionIcon: {
    marginRight: wp('2%'),
  },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
  },
  equipmentButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    borderRadius: 10,
    width: wp('43%'),
    marginVertical: hp('1%'),
  },
  selectedEquipmentButton: {
    backgroundColor: '#ADFF2F',
  },
  equipmentText: {
    fontSize: wp('4%'),
    color: '#000',
    textAlign: 'center',
  },
  selectedEquipmentText: {
    color: '#000',
  },
  dtlOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('2%'),
    backgroundColor: '#E8E8E8',
    borderRadius: 30,
    paddingVertical: hp('.3%'),
  },
  dtlOptionButton: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 30,
    marginHorizontal: wp('.5%'),
    alignItems: 'center',
  },
  dtlSelectedOptionText: {
    fontFamily: 'Outfit-Regular',
    color: '#192126',
  },
  golferImage: {
    width: wp('60%'),
    height: hp('30%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  golferImage1: {
    width: wp('80%'),
    height: hp('40%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginTop: hp('1%'),
  },
  sliderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: hp('5%'),
  },
  scoreText: {
    color: '#192126',
    fontFamily: 'Outfit-SemiBold',
    fontSize: wp('4.5%'),
    textAlign: 'center',
    marginVertical: hp('1%'),
  },
  buttonContainer: {
    bottom: wp('4%'),
    padding: wp('6%'),
  },
  buttonContainerHome: {
    bottom: wp('15%'),
    padding: wp('6%'),
  }
});

export default globalStyles;
