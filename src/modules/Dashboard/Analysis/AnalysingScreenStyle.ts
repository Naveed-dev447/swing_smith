import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#fff',
  },
  image: {
    width: wp('90%'), 
    height: hp('25%'), 
    marginBottom: hp('2%'),
    justifyContent: 'center',
    borderRadius: wp('2%'),
  },
  analysisCardContainer: {
    backgroundColor: '#192126',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('90%'),
    marginBottom: hp('2%'),
  },
  profileImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    marginRight: wp('4%'),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontFamily: 'Outfit-SemiBold',
    fontSize: wp('5%'),
  },
  userSkill: {
    color: '#FFFFFF',
    fontFamily: 'Outfit-Regular',
    fontSize: wp('3.5%'),
  },
  scoreContainer: {
    alignItems: 'center',
  },
  flagImage: {
    width: wp('4%'),
    height: wp('4%'),
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    fontFamily: 'Outfit-Bold',
  },
  scoreLabel: {
    color: '#FFFFFF',
    fontSize: wp('3.5%'),
    fontFamily: 'Outfit-Regular',
  },
  scoreCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
  },
  scoreCard: {
    backgroundColor: '#BBF246',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    width: wp('42%'),
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  scoreCardText: {
    color: '#192126',
    fontSize: wp('4%'),
    fontFamily: 'Outfit-SemiBold',
  },
  scoreCardValue: {
    color: '#192126',
    fontSize: wp('6%'),
    fontFamily: 'Outfit-SemiBold',
  },
  scoreCardIcon: {
    position: 'absolute',
    top: wp('2%'),
    right: wp('2%'),
    width: wp('5%'),
    height: wp('5%'),
  },
  instructionContainer: {
    width: wp('90%'),

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
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },

  instructionTitle: {
    fontSize: wp('5%'),
    fontFamily:'Outfit-Bold',
    marginRight: wp('1%'),
    color: '#192126',
  },
  subInstructionText: {
    fontSize: wp('4%'),
    fontFamily:'Outfit-SemiBold',
    marginBottom: hp('1%'),
    color: '#192126',
  },
  subTitle:{
    fontSize: wp('4%'),
    fontFamily:'Outfit-SemiBold',
    // marginBottom: hp('1%'),
    color: '#192126',
  },
  infoIcon: {
    width: wp('6%'),
    height: wp('5%'),
    resizeMode: 'contain',
  },  
  instructionText: {
    fontSize: wp('4%'),
    color: '#192126',
    fontFamily:'Outfit-Regular',

  },
});
