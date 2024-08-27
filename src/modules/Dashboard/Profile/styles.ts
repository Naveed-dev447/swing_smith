import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    marginVertical: hp('2.5%'),
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('20%'),
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    // right: wp('8%'),
    backgroundColor: '#A5D939',
    padding: wp('2%'),
    borderRadius: wp('5%'),
  },
  profileName: {
    fontSize: wp('5.5%'), 
    fontWeight: 'bold',
    marginTop: hp('1.25%'),
  },
  profileEmail: {
    fontSize: wp('3.5%'),
    color: '#7E7E7E',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  optionIcon: {
    backgroundColor: '#A5D939',
    borderRadius: wp('20%'),
    width: wp('8.5%'),
    height: hp('4%'),
    justifyContent:'center',
    alignItems:'center', 
    marginRight: wp('3.75%'), 
  },
  optionText: {
    fontSize: wp('4%'), 
    fontWeight: '600',
    fontFamily: 'outfit',
    flex: 1,
  },
  optionRightText: {
    fontSize: wp('4%'), 
    fontWeight: '400',
    color:'#222B45',
    fontFamily: 'outfit',
    flex: 1,
  },
  arrowIcon: {
    fontSize: wp('4.5%'), 
    color: '#B0B0B0',
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
