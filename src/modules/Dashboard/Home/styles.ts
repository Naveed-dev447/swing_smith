import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
  },
  headerContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tiles: {
    width: wp('7%'),
    height: hp('4%'), 
    resizeMode: 'contain',
  },

  headerIcon: {
    fontSize: wp('8%'),
    color: 'black',
  },
  headerText: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  subHeader: {
    fontSize: wp('4%'),
    color: 'gray',
  },
  bannerText: {
    fontSize: wp('5%'),
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: wp('4%'),
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
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
    height: hp('10%'),
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
    fontSize: wp('4.5%'),
  },
  swingDesText: {
    color: '#FFFFFF',
    paddingLeft: wp('4%'),
  },
  recommendedSection: {
    marginVertical: hp('2%'),
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  recommendedTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: wp('4%'),
    color: 'limegreen',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
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
  },
  markAsDoneText: {
    color: 'white',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    width: '100%',
    height: hp('75%'),
    padding: wp('4%'),
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
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: 'black',
  },
  modalDateLabel: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
  },
  datePickerContainer: {
    marginBottom: hp('2%'),
  },
  datePicker: {
    padding: wp('3%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
  dateText: {
    fontSize: wp('4%'),
  },
  modalClubLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
  },
  clubOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('2%'),
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
});

export default globalStyles;
