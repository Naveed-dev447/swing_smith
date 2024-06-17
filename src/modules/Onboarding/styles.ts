// styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp('5%'),
        marginTop: hp('5%')
        // justifyContent: 'center',
    },
    title: {
        color:'#000',
        fontSize: wp('6%'),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: hp('2%'),
    },
    subTitle: {
        color:'#000',
        fontSize: wp('4%'),
        alignSelf:'center',
        marginTop: hp('1%'),
        marginBottom: hp('3%'),
    },
    levelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: hp('2%'),
      },
      levelButton: {
        backgroundColor: '#E8E8E8',
        padding: hp('4%'),
        alignItems: 'center',
        borderRadius: 10,
        width: wp('43%'),
        marginVertical: hp('1%'),
      },
      selectedLevelButton: {
        backgroundColor: '#ADFF2F',
      },
      levelText: {
        fontSize: wp('4%'),
        color: '#000',
      },
      selectedLevelText: {
        color: '#000',
      },
      optionContainer: {
        marginVertical: hp('2%'),
      },
      optionButton: {
        backgroundColor: '#E8E8E8',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('4%'),
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: hp('1%'),
        flexDirection: 'row',
      },
      selectedOptionButton: {
        backgroundColor: '#ADFF2F',
      },
      optionText: {
        fontSize: wp('4%'),
        color: '#000',
        marginLeft: wp('2%'),
      },
      selectedOptionText: {
        color: '#000',
      },
      optionIcon: {
        marginRight: wp('2%'),
      },
      equipmentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: hp('2%'),
      },
      equipmentButton: {
        backgroundColor: '#E8E8E8',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('5%'),
        alignItems: 'center',
        borderRadius: 10,
        width: wp('43%'),
        marginVertical: hp('1%'),
      },
      selectedEquipmentButton: {
        backgroundColor: '#ADFF2F',
      },
      equipmentText: {
        fontSize: wp('4%'),
        color: '#000',
        textAlign: 'center',
      },
      selectedEquipmentText: {
        color: '#000',
      },
      golferImage: {
        width: wp('60%'),
        height: hp('30%'),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: hp('5%'),
      },
    sliderContainer: {
        alignItems: 'center',
        flex:1,
        justifyContent:'center'
    },
    slider: {
        width: '100%',
        height: hp('5%'),
    },
    scoreText: {
        color:'#000',
        fontSize: wp('4%'),
        textAlign: 'center',
        marginVertical: hp('2%'),
    },
    buttonContainer: {
        padding: wp('6%'),
    },
    
});

export default globalStyles;
