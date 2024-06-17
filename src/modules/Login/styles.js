import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginContainer: {
      width: '95%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 10,
      padding: hp('5%'),
      alignItems: 'center',
    },
    title: {
      fontSize: hp('3%'),
      fontWeight: 'bold',
      color: '#000',
      marginBottom: hp('1%'),
    },
    subtitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp('2%'),
    },
    subtitle: {
      fontSize: hp('2%'),
    },
    signUp: {
      color: '#000',
      fontWeight: 'bold',
      marginLeft: 4,
    },
    rememberContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: hp('2%'),
    },
    rememberText: {
      fontSize: hp('1.8%'),
    },
    forgotText: {
      fontSize: hp('1.8%'),
      color: '#000',
      fontWeight: 'bold',
    },
    loginButton: {
      backgroundColor: '#000',
      paddingVertical: hp('1.5%'),
      paddingHorizontal: wp('28%'),
      borderRadius: 25,
      marginBottom: hp('1%'),
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: hp('2%'),
      fontFamily: 'Outfit-Regular',
    },
    orText: {
      fontSize: hp('2%'),
      marginVertical: hp('1.5%'),
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: hp('1.5%'),
      paddingHorizontal: wp('10%'),
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#fff',
      marginBottom: hp('2%'),
    },
    socialButtonText: {
      color: '#000',
      fontSize: hp('2%'),
      fontWeight: 'bold',
      marginLeft: wp('2%'),
    },
    socialIcon: {
      width: hp('3%'),
      height: hp('3%'),
    },
  });
  
  