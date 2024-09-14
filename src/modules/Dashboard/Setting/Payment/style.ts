import { Platform, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'),
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  image: {
    width: '100%',
    height: hp('24%'),
    borderRadius: 10,
    marginVertical: hp('2%'),
  },
  textContainer: {
    marginLeft: wp('6%'),
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
  },
  title: {
    width: wp('30%'),
    fontSize: wp('6%'),
    color: "#FFFFFF",
    fontFamily: 'Outfit-Regular',
    fontWeight: '700',
  },
  highlight: {
    width: wp('30%'),
    fontSize: wp('6%'),
    color: "#BBF246",
    fontFamily: 'Outfit-Regular',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: wp('3.8%'),
    marginTop: hp('1%'),
    fontWeight: '400',
    fontFamily: 'Outfit-Regular',
    color: '#FFFFFF',
    width: wp('55%'),
  },
  benefitsContainer: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.5%'),
  },
  benefitText: {
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    color: "#192126CC",
    fontWeight: '600',
    fontFamily: 'Outfit-Regular',
  },
  plansContainer: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  plan: {
    width: '48%',
    padding: wp('7%'),
    backgroundColor: '#f0f0f0',
    borderRadius: 10
  },
  selectedPlan: {
    width: '48%',
    padding: wp('7%'),
    backgroundColor: '#BBF246',
    borderRadius: 10
  },
  planType: {
    fontSize: wp('4.5%'),
    fontWeight: '500',
    fontFamily: 'Outfit-Regular',
    color: '#192126'
  },
  price: {
    fontSize: wp('6%'),
    fontWeight: '500',
    marginTop: hp('1%'),
    fontFamily: 'Outfit-Regular',
    marginBottom: hp('1%'),
    color: '#192126',
  },
  billing: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    marginTop: 'auto',
    fontFamily: 'Outfit-Regular',
    color: '#192126',
  },
  save: {
    fontSize: wp('3.5%'),
    marginBottom: hp('1%'),
  },
  trial: {
    fontSize: wp('3.5%'),
    color: '#777',
  },
  agreement: {
    alignSelf: 'center',
    width: wp('50%'),
    fontSize: wp('3.5%'),
    fontWeight: '400',
    fontFamily: 'Outfit-Regular',
    color: '#192126',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  link: {
    marginTop: hp('1%'),
    color: '#636363',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000',
    padding: wp('4%'),
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp('4.5%'),
    color: '#fff',
    fontWeight: 'bold',
  },
  cardFieldContainer: {
    marginVertical: hp('2%'),
    borderRadius: wp('2%'),
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        // shadowOpacity: 0.2,
        shadowRadius: hp('2%'),
        shadowOffset: {
          width: 0,
          height: hp('1%'),
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardField: {
    width: wp('90%'),
    height: hp('7%'),
    borderRadius: wp('2%'),
    backgroundColor: '#f8f9fa',
  },
});

export default styles;
