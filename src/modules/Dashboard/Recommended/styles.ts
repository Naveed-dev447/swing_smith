// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const recommandedStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('4%'),
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     marginTop: hp('5%'),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerIcon: {
//     fontSize: wp('8%'),
//     color: 'black',
//   },
//   headerText: {
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: hp('2%'),
//   },
//   tab: {
//     padding: wp('2%'),
//     borderRadius: wp('2%'),
//   },
//   tabText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//   },
//   sectionTitle: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     marginVertical: hp('1%'),
//   },
//   cardContainer: {
//     borderRadius: wp('2%'),
//     backgroundColor: '#fff',
//     marginBottom: hp('2%'),
//     overflow: 'hidden',
//     marginRight: wp('2%'),
//     width: wp('40%'),
//     alignItems: 'center',
//     padding: wp('2%'),
//     borderColor: '#ddd', // Add border color
//     borderWidth: 0.5,      // Set border width
//     shadowColor: '#000', // Set shadow color
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25, // Set shadow opacity
//     shadowRadius: 3.84,  // Set shadow radius
//     elevation: 5,        // Set elevation for Android
//   },
//   cardImage: {
//     width: '100%',
//     height: hp('12%'),
//   },
//   cardContent: {
//     padding: wp('2%'), // Adjust padding for better spacing
//     alignItems: 'center',
//   },
//   cardText: {
//     fontSize: wp('4%'),
//     color: '#555',
//     textAlign: 'center',
//   },
//   cardIcon: {
//     fontSize: wp('7%'),
//     color: 'limegreen',
//     marginBottom: hp('1%'),
//   },
//   smallText: {
//     fontSize: wp('3.5%'), // Add smaller text style
//     color: '#192126',
//     lineHeight:wp('5%'),
//     textAlign: 'center',
//   },
//   progressText:{
//     fontSize: wp('4%'), // Add bold text style
//     color: '#000',
//     textAlign: 'center',
//     padding: wp('1%')
//   },
//   boldText: {
//     fontSize: wp('4%'), // Add bold text style
//     color: '#000',
//     fontWeight:'600',
//     textAlign: 'center',
//     padding: wp('2%')
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     paddingBottom: hp('2%'),
//   },
// });

// export default recommandedStyles;


import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const recommandedStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginTop: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: wp('8%'),
    color: 'black',
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  tabContainer: {
    paddingTop: wp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('2%'),
  },
  tab: {
    width: wp('25%'),
    padding: wp('2%'),
    justifyContent:'center',
    alignItems:'center',
    borderRadius: wp('4%'),
    borderWidth:1
  },
  tabText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
  cardContainer: {
    borderRadius: wp('2%'),
    backgroundColor: '#fff',
    marginBottom: hp('2%'),
    overflow: 'hidden',
    marginRight: wp('2%'),
    width: wp('40%'),
    height: hp('30%'),
    alignItems: 'center',
    padding: wp('2%'),
    borderColor: '#ddd',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: hp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -wp('5%') }, { translateY: -wp('5%') }],
  },
  cardTitle: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    position: 'absolute',
    bottom: hp('2%'),
    left: wp('2%'),
  },
  cardContent: {
    padding: wp('2%'),
    alignItems: 'center',
  },
  cardText: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    color: '#192126',
    textAlign: 'center',
  },
  cardIcon: {
    fontSize: wp('10%'),
    color: 'limegreen',
    marginBottom: hp('1%'),
  },
  smallText: {
    fontSize: wp('3.5%'),
    color: '#192126',
    lineHeight: wp('5%'),
    textAlign: 'center',
  },
  progressText: {
    fontSize: wp('4%'),
    color: '#000',
    textAlign: 'center',
    padding: wp('1%'),
  },
  boldText: {
    fontSize: wp('4%'),
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    padding: wp('2%'),
  },
  scrollViewContent: {
    // flexGrow: 1,
    paddingVertical: hp('2%'),
  },
});

export default recommandedStyles;
