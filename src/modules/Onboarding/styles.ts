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
        fontSize: wp('6%'),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: hp('2%'),
    },
    subTitle: {
        fontSize: wp('4%'),
        alignSelf:'center',
        marginTop: hp('1%'),
        marginBottom: hp('3%'),
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
        fontSize: wp('5%'),
        textAlign: 'center',
        marginVertical: hp('2%'),
    },
    buttonContainer: {
        padding: wp('6%'),
    }
});

export default globalStyles;
