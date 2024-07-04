import { Platform, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: hp('10%'),
    alignItems: 'center',
    width: '100%',
  },
  title: {
    width: wp('90%'),
    fontSize: wp('8%'),
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily:'Inria Sans',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontFamily:'Plus Jakarta Sans',
    fontWeight:'500',
    marginBottom: hp('4%'),
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
    fontFamily:'Inter',
    textAlign:'center',
    fontWeight: '600',
  },
});
