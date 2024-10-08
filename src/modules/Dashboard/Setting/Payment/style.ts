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
    height: hp('25%'),
    padding: 10,
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    borderColor: '#474D51',
    borderRadius: 8,
    borderWidth: 0.3,
    position: 'relative',
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: hp('1.5%'),
    marginVertical: hp('1%'),
  },
  benefitText: {
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
    color: "#192126CC",
    fontWeight: '600',
    fontFamily: 'Outfit-Regular',
  },
  benefitSubText: {
    marginHorizontal: hp('5%'),
    color: '#545454',
    fontWeight: '400',
    fontFamily: 'Outfit',
    lineHeight: 22
  },
  topCenterLabel: {
    position: 'absolute',
    alignSelf: 'center',
    top: -hp('2%'), // Align near the top border
    backgroundColor: '#FFC107', // Background color for the label
    color: '#505254',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    fontSize: wp('3.5%'),
    fontWeight: '400',
    fontFamily: 'Outfit',
    borderRadius: wp('2%'), // Rounded corners
    overflow: 'hidden', // Prevents text from overflowing
    borderWidth: 0.3, // Optional border to match the container
    borderColor: '#474D51',
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
    backgroundColor: '#dff5b0',
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
    // backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    bottom: wp('4%'),
    padding: wp('4%'),
  },
  couponView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: wp('1%'),
    borderColor: '#ced4da'
  },
  inputStyle: {
    flex: 1,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('2%'),
  },
  couponButton: {
    borderRadius: 8,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('2%'),
  },
  couponText: {
    fontFamily: 'Outfit-Medium',
    color: '#FFFFFF',
    fontSize: hp('2%'),
  },
  checkMarkContainer: {
    position: 'absolute',
    top: -hp('0%'),
    right: -hp('0%'),
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },



  card: {
    margin: wp('4%'),
    padding: wp('4%'),
    borderRadius: wp('2%'),
    backgroundColor: '#000',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('4%'),
  },
  logo: {
    width: wp('10%'),
    height: wp('10%'),
    marginRight: wp('4%'),
  },
  planName: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  planDetails: {
    color: '#ccc',
    fontSize: wp('4%'),
  },
  paymentDue: {
    color: '#ccc',
    fontSize: wp('4%'),
  },
  paymentDueHighlight: {
    color: 'green',
  },
  price1: {
    marginLeft: 'auto',
    color: '#fff',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  missedPayment: {
    color: 'red',
  },
  cancelButton: {
    marginTop: hp('10%'),
    backgroundColor: '#192126',
    borderRadius: 25,
    paddingVertical: hp('1.5%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontFamily: 'Outfit-SemiBold',
    fontSize: wp('4.2%'),
  },





  cardBackground: {
    marginTop: wp('5%'),
    width: wp('90%'),
    height: hp('25%'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  chipIconContainer: {
    width: 50,
    height: 30,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    marginBottom: 10,
  },
  chipIcon: {
    width: '100%',
    height: '100%',
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Plus Jakarta Sans'
  },
  cardHolderName: {
    marginTop: hp('0.5%'),
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans'
  },
  expiryDate: {
    marginTop: hp('0.5%'),
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans'
  },
  row: {
    marginTop: hp('5%'),
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('90%'),
    flexDirection: 'row',
    fontFamily: 'Outfit',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoBox: {
    width: '48%',
    padding: 11,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    color: '#8F8F8F',
  },
  value: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'Outfit',
    fontWeight: '500',
    color: '#1C162E',
  },
  autoRenewalContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    padding: wp('3%'),
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 15,
  },
  autoRenewalLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Outfit',
    color: '#000000',
  },
  paymentContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#ebfaca',
    borderWidth: 1,
    borderColor: '#BBF246',
    borderRadius: 8,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Outfit',
    color: '#192126',
  },
  dueText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Outfit',
    color: '#192126',
  },
  paymentValue: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
    color: '#1A1A1A',
  },
  perMonth: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Outfit',
    color: '#192126',
    textAlign: 'right',
  },
});

export default styles;
