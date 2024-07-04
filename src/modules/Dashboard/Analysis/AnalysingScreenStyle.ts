import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('2%'),
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: wp('100%'),
//     height: wp('50%'),
//     marginBottom: hp('2%'),
//     justifyContent: 'center',
//   },
//   analysisCardContainer: {
//     backgroundColor: '#192126',
//     borderRadius: wp('2%'),
//     padding: wp('4%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: wp('100%'),
//   },
//   profileImage: {
//     width: wp('15%'),
//     height: wp('15%'),
//     borderRadius: wp('7.5%'),
//     marginRight: wp('4%'),
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     color: '#FFFFFF',
//     fontSize: wp('5%'),
//     fontWeight: '600',
//   },
//   userSkill: {
//     color: '#FFFFFF',
//     fontSize: wp('3.5%'),
//   },
//   scoreContainer: {
//     alignItems: 'center',
//   },
//   flagImage: {
//     width: wp('4%'),
//     height: wp('4%'),
//   },
//   scoreText: {
//     color: '#FFFFFF',
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//   },
//   scoreLabel: {
//     color: '#FFFFFF',
//     fontSize: wp('3.5%'),
//   },

//   scoreCardContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: hp('2%'),
//     width: wp('100%'),

//   },
//   scoreCard: {
//     backgroundColor: '#BBF246',
//     borderRadius: wp('2%'),
//     padding: wp('4%'),
//     width: wp('48%'),
//     justifyContent: 'center',
//   },
//   scoreCardText: {
//     color: '#192126',
//     fontSize: wp('4%'),
//     fontWeight: '500',
//   },
//   scoreCardValue: {
//     color: '#192126',
//     fontSize: wp('6%'),
//     fontWeight: '500',
//   },
//   scoreCardIcon: {
//     position: 'absolute',
//     top: wp('2%'),
//     right: wp('4%'),
//     width: wp('5%'),
//     height: wp('5%'),
//   },
container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', // Center the content horizontally
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
    width: wp('90%'), // Center the image by reducing its width
    height: hp('25%'), // Adjusted height to better fit the screen
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
    width: wp('90%'), // Center the card by reducing its width
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
    fontSize: wp('5%'),
    fontWeight: '600',
  },
  userSkill: {
    color: '#FFFFFF',
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
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#FFFFFF',
    fontSize: wp('3.5%'),
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
    fontWeight: '500',
  },
  scoreCardValue: {
    color: '#192126',
    fontSize: wp('6%'),
    fontWeight: '600',
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
    fontWeight: 'bold',
    marginRight: wp('1%'),
    color: '#192126',
  },
  subInstructionText:{
    fontSize: wp('4%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
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
  },
});
