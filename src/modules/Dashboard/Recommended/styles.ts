import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const recommandedStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('1%'),
    backgroundColor: '#fff',
    marginBottom: wp('20%'),
  },
  headerContainer: {
    marginTop: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: wp('8%'),
    color: 'black',
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  tabContainer: {
    paddingTop: wp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    width: wp('25%'),
    padding: wp('2%'),
    margin: wp('2%'),
    alignItems: 'center',
    borderRadius: wp('7%'),
    borderWidth: 0.5,
  },
  tabText: {
    fontSize: wp('3.5%'),
    fontFamily: 'Overpass-Bold',
    color: '#192126',
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginVertical: hp('1%'),
  },
  maincontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cardContainer: {
    width: wp('44%'),
    margin: wp('1%'),
    marginRight: (wp('3%')),
    marginTop: hp('2%'),
    height: hp('50%'),
    marginBottom: wp('5%'),
    borderRadius: wp('2%'),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: wp('45%'),
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '10%',
    right: '10%',
  },
  cardTitle: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
    marginBottom: wp('2%'),
  },
  cardDescription: {
    color: 'white',
    fontSize: wp('3%'),
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    marginBottom: wp('7%'),
  },
  cardContent: {
    padding: wp('2%'),
  },
  smallText: {
    fontFamily: 'Outfit',
    textAlign: 'center',
    color: '#fff',
  },
  cardIcon: {
    alignSelf: 'center',
    marginTop: wp('7%'),
    width: wp('15%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: wp('4%'),
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
    color: '#000',

    marginVertical: wp('2%'),
  },
  cardSmallText: {
    fontSize: wp('3%'),
    textAlign: 'center',
    color: '#192126',
    fontFamily: 'Outfit-Regular',
  },
  progressText: {
    fontSize: wp('4%'),
    color: '#000',
    textAlign: 'center',
    padding: wp('1%'),
  },
  boldText: {
    fontSize: wp('4%'),
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    padding: wp('2%'),
  },
  scrollViewContent: {
    // flexGrow: 1,
    paddingVertical: hp('2%'),
  },
  drillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },
});

export default recommandedStyles;
