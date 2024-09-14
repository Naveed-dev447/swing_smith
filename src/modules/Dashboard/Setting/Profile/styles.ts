import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('5%'),
    marginVertical: hp('2.5%'),
    marginHorizontal: wp('5%'),
    borderRadius: 10,
    backgroundColor: '#ffff'
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('20%'),
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: wp('3%'),
    backgroundColor: '#BBF246',
    padding: wp('2%'),
    borderRadius: wp('5%'),
  },
  profileName: {
    fontSize: wp('5.5%'),
    fontFamily: 'Outfit-Bold',
    color: Colors.black,
    textAlign: 'center',
    marginTop: hp('1.25%'),
  },
  profileEmail: {
    fontSize: wp('3.5%'),
    color: "#8F9BB3",
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',

  },
  optionMainContainer: {
    paddingVertical: hp('2.5%'),
    marginHorizontal: wp('5%'),
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginBottom: hp('2.5')
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
  },
  optionIcon: {
    backgroundColor: '#BBF246',
    borderRadius: wp('20%'),
    width: wp('8.5%'),
    height: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3.75%'),
  },
  optionText: {
    fontSize: wp('4%'),
    fontWeight: '600',
    fontFamily: 'Outfit-SemiBold',
    flex: 1,
    color: '#222B45'
  },
  optionRightText: {
    fontSize: wp('3.5%'),
    fontWeight: '400',
    color: '#222B45',
    fontFamily: 'Outfit-Regular',
    flex: 1,
  },
  arrowIcon: {
    fontSize: wp('2.5%'),
    color: '#C5CEE0',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  logoutButton: {
    marginTop: hp('3%'),
    width: wp('80%'),
    alignSelf: 'center',
    padding: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
