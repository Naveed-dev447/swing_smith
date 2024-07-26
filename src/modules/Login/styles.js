import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTheme } from '../../theme/theme';

 export default function useLoginStyles() {
   const { colors } = useTheme();
   return StyleSheet.create({
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
    fontFamily: 'Outfit-Bold',
    color: '#192126',
    marginBottom: hp('1%'),
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: hp('1.8%'),
    fontFamily: 'Outfit-Regular',
    fontWeight: '500',
    color: "#6C7278"
  },
  signUp: {
    fontSize: hp('2%'),
    color: '#192126',
    fontFamily: 'Outfit-Bold',
    marginLeft: 4,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('80%'),
    marginBottom: hp('2%'),
  },
  rememberText: {
    fontSize: hp('1.8%'),
  },
  forgotText: {
    fontSize: hp('1.8%'),
    color: '#192126',
    fontFamily: 'Outfit-SemiBold',
  },
  loginButton: {
    borderRadius: 25,
    paddingVertical: hp('1.5%'),
    width: wp('80%'), 
    alignItems: 'center',
    backgroundColor: '#000',
    marginBottom: hp('1%'),
  },
  loginButtonText: {
    fontFamily: 'Outfit-Medium',
    color: '#FFFFFF',
    fontSize: hp('2%'),
  },
  orText: {
    color: '#6C7278',
    fontFamily: 'Inter-Regular',
    marginVertical: hp('2%'),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingVertical: hp('1.5%'),
    width: wp('80%'),
    borderRadius: 25,
    marginBottom: hp('2%'),
  },
  socialButtonText: {
    color: '#1A1C1E',
    fontFamily: 'Inter-SemiBold',
    fontSize: hp('1.8%'),
    marginLeft: wp('2%'),
  },
  socialIcon: {
    width: hp('3%'),
    height: hp('3%'),
  },
  button: {
    backgroundColor: '#BBF246',
    borderRadius: 25,
    paddingVertical: hp('1.5%'),
    width: wp('90%'), // Set a fixed width
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp('4.5%'),
    color: '#192126',
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: '600',
  },
});
 }
 