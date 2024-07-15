import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  scrollContentContainer: {
    paddingBottom: hp('14%'), 
    paddingHorizontal:wp('5%'),
    marginTop:hp('5%'), 
  },
  videoContainer: {
    width: wp('90%'),
    height: hp('25%'),
    borderWidth: 2,
    borderColor: '#B2FF59',
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginBottom: hp('5%'),
    paddingHorizontal: 2,
  },
  videoContainerWithoutBorder: {
    borderWidth: 0,
  },
  uploadIcon: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
    marginBottom: hp('1%'),
  },
  uploadText: {
    fontSize: wp('4%'),
    color: '#666666',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  instructionContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  featuredVideoContainer: {
    marginBottom: wp('5%'),
  },

  time: {
    color: '#192126',
    fontFamily: 'Outfit-Regular',
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  instructionTitle: {
    fontSize: wp('5%'),
    fontFamily: 'Outfit-SemiBold',
    marginRight: wp('1%'),
    color: '#192126',
  },
  infoIcon: {
    width: wp('6%'),
    height: wp('5%'),
    resizeMode: 'contain',
  },
  instructionText: {
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Regular',
    color: '#192126',
  },
  recommendedTitle: {
    fontSize: wp('5%'),
    fontFamily: 'Outfit-SemiBold',
    marginBottom: 10,
    color: '#192126',
  },
  horizontalScroll: {
    marginVertical: hp('2%'),
  },
  tutorialCard: {
    width: wp('80%'),
    height: wp('40%'),
    borderRadius: wp('3%'),
    overflow: 'hidden',
    marginRight: wp('3%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  tutorialDetails: {
    padding: wp('2%'),
  },
  tutorialTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#192126',
    marginBottom: hp('1%'),
  },
  tutorialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tutorialInstructor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    marginRight: wp('2%'),
  },
  instructorName: {
    fontSize: wp('3.5%'),
    color: '#192126',
  },
  tutorialDuration: {
    fontSize: wp('3.5%'),
    color: '#192126',
    backgroundColor: '#EBEBEB',
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('1%'),
    borderRadius: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: wp('2%'),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: wp('2%'),
  },
  tutorialTitleOverlay: {
    color: '#ffffff',
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Bold',
  },
  tutorialFooterOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('5%'), // Ensure button is not hidden by navbar
  },
});

export default styles;
