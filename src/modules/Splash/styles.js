import { StyleSheet } from 'react-native';
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
    paddingHorizontal: wp('10%'),
  },
  title: {
    fontSize: wp('7%'),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: 'white',
    textAlign: 'center',
    marginBottom: hp('4%'),
  },
  button: {
    backgroundColor: '#B3D234',
    borderRadius: 25,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
  },
  buttonText: {
    fontSize: wp('4.5%'),
    color: 'white',
    fontWeight: 'bold',
  },
});
