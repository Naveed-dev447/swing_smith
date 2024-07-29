import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('3%'),
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: wp('1.5%'),
    marginTop: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tiles: {
    width: wp('5%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },

  manProfile: {
    width: wp('12%'),
    height: hp('7%'),
    resizeMode: 'contain',
  },
  headerIcon: {
    fontSize: wp('8%'),
    color: 'black',
  },
  headerText: {
    fontFamily: 'Outfit-Bold',
    fontSize: wp('8%'),
    marginTop: hp('2%'),
    color: '#333333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  locationIcon: {
    width: wp('6%'),
    height: wp('5%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
  },
  graphPieIcon: {
    width: wp('13%'),
    height: wp('13%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
    marginBottom: wp('2%'),
  },
  drillIcon: {
    width: wp('15%'),
    height: wp('10%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
    marginBottom: wp('2%'),
  },
  swingLogFIlterIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SwingLogScrollView: {
    paddingVertical: 10,
    paddingBottom: hp('10%'),
  },
  swinglogGolfIcon: {
    width: wp('4%'),
    height: wp('5%'),
    resizeMode: 'contain',
  },
  swinglogDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swinglogCalendarIcon: {
    width: wp('4%'),
    height: wp('4%'),
    resizeMode: 'contain',
    marginRight: wp('1%'),
  },
  subHeader: {
    fontSize: wp('4%'),
    color: '#828282',
    fontFamily: 'Inter-Regular',
  },
  bannerText: {
    fontSize: wp('6%'),
    width: wp('40%'),
    color: '#FFFFFF',
    fontFamily: 'Outfit-Bold',
    textAlign: 'left',
    lineHeight: hp('3.5%'),
  },
  uploadSwingText: {
    fontSize: wp('6%'),
    color: '#FFFFFF',
    fontFamily: 'Outfit-Bold',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: wp('4%'),
    color: '#192126',
    fontFamily: 'Outfit-Bold',
  },
  analysisCard: {
    width: wp('80%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  analysisCardImage: {
    width: '100%',
    height: hp('20%'),
    justifyContent: 'center',
  },
  analysisCardContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp('4%'),
  },
  cardSubtitle: {
    fontSize: wp('5%'),
    color: 'white',
  },
  uploadSwingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
    borderRadius: wp('2%'),
    backgroundColor: 'white',
    elevation: 2,
  },
  uploadSwingImage: {
    width: '100%',
    height: hp('20%'),
    borderRadius: wp('2%'),
  },
  uploadButton: {
    backgroundColor: '#BBF246',
    paddingVertical: hp('0.8%'),
    width: wp('40%'),
    margin: wp('3%'),
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('6%'),
    borderRadius: wp('4%'),
  },
  uploadButtonText: {
    color: '#192126',
    fontFamily: 'Inter-SemiBold',
    fontSize: wp('3.5%'),
  },
  swingDesText: {
    fontFamily: 'Outfit-Regular',
    color: '#FFFFFF',
    paddingLeft: wp('4%'),
  },
  recommendedSection: {
    marginHorizontal: wp('2%'),
    marginVertical: hp('1%'),
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  analysisView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90%'),
    padding: wp('3%'),
  },
  recommendedTitle: {
    fontSize: wp('4.5%'),
    fontFamily: 'Outfit-Bold',
    color: '#192126',
  },
  seeAll: {
    fontFamily: 'Outfit-Regular',
    fontSize: wp('4%'),
    color: '#192126',
  },
  card: {
    marginLeft: wp('1%'),
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    justifyContent: 'center',
    marginVertical: wp('2%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardImage: {
    width: '100%',
    height: hp('15%'),
  },
  cardContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp('2%'),
  },
  markAsDoneButton: {
    marginTop: hp('1%'),
    backgroundColor: 'black',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    marginBottom: hp('0.5%'),
  },
  markAsDoneText: {
    color: '#ffffff',
    fontFamily: 'Outfit-Regular'
  },
  challengeCards: {
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: wp('6%'),
    justifyContent: 'center',
    marginVertical: wp('4%'),
    alignItems: 'center',
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    width: '100%',
    height: hp('75%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: 'white',
    borderTopLeftRadius: wp('4%'),
    borderTopRightRadius: wp('4%'),
  },
  handle: {
    width: wp('20%'),
    height: hp('0.5%'),
    backgroundColor: '#888',
    borderRadius: wp('1%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('1.5%'),
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: wp('6%'),
    fontFamily: 'Outfit-Bold',
    marginBottom: hp('1%'),
    color: '#192126',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalDateLabel: {
    fontSize: wp('3.5%'),
    color: '#192126',
    fontFamily: 'Outfit-Regular'
  },
  datePickerContainer: {
    marginBottom: hp('1.2%'),
  },
  datePicker: {
    padding: wp('3%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
  modalClubLabel: {
    color: '#192126',
    fontFamily: 'Outfit-Bold',
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
  },
  clubOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('0.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubOption: {
    padding: wp('3%'),
    backgroundColor: '#f0f0f0',
    borderRadius: wp('2%'),
    margin: wp('1%'),
  },
  clubText: {
    fontSize: wp('4%'),
  },
  modalButtonText: {
    color: 'white',
    fontSize: wp('4%'),
    borderRadius: 25,
  },
  // Swing log screen styling
  header: {
    fontSize: wp('6%'),
    fontFamily: 'Outfit-Bold',
    color: '#282E34',
  },
  cardContainer: {
    borderColor: '#F0F0F0',
    borderWidth: 1,
    borderRadius: wp('2.5%'),
    backgroundColor: '#fff',
    marginBottom: hp('1%'),
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    height: hp('20%'),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageStyle: {
    borderTopLeftRadius: wp('2.5%'),
    borderTopRightRadius: wp('2.5%'),
  },
  score: {
    fontSize: wp('5%'),
    fontFamily: 'Outfit-Bold',
    color: '#ffffff',
    padding: wp('3%'),
  },
  iconHeart: {
    padding: wp('3%'),
    borderRadius: wp('1%'),
    fontSize: wp('5%'),
  },
  description: {
    fontSize: wp('3.2%'),
    color: '#19212680',
    fontFamily: 'Poppins-Regular',
    margin: wp('2.5%'),
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('2.5%'),
    marginBottom: hp('1%'),
  },
  detailItem: {
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: wp('3.5%'),
    fontFamily: 'Outfit-Regular',
    marginLeft: wp('1.25%'),
    color: '#192126',
  },
  dateText: {
    fontSize: wp('3.5%'),
    fontFamily: 'Outfit-Regular',
    color: '#192126',
  },
  filterIcon: {
    width: wp('9%'),
    height: hp('6%'),
    marginLeft: hp('1%'),
    resizeMode: 'contain',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#00C851',
    borderRadius: wp('1.25%'),
    margin: wp('2.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1.25%'),
  },
  buttonIcon: {
    fontSize: wp('4.5%'),
    marginRight: wp('1.25%'),
  },
  buttonText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default globalStyles;
