import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface IVideeoCardComponent {
    imageUri: string;
    title: string;
    author: string;
    duration: string;
    index: number,
}

const VideoCardComponent: React.FC<IVideeoCardComponent> = ({ imageUri, title, author, duration, index }) => (
    <View style={recommandedStyles.cardContainer} key={index}>
        <ImageBackground source={{ uri: imageUri }} style={recommandedStyles.cardImage}>
            <Text style={recommandedStyles.cardTitle}>{title}</Text>
            <Icon name="play-circle" style={recommandedStyles.playIcon} />
        </ImageBackground>
        <View style={recommandedStyles.cardContent}>
            <View style={recommandedStyles.authorContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={recommandedStyles.authorImage} />
                <Text style={recommandedStyles.cardText}>{author}</Text>
            </View>
            <View style={recommandedStyles.durationContainer}>
                <Icon name="clock-o" style={recommandedStyles.durationIcon} />
                <Text style={recommandedStyles.durationText}>{duration}</Text>
            </View>
        </View>
    </View>
);

const recommandedStyles = StyleSheet.create({
    cardContainer: {
        borderRadius: wp('2%'),
        backgroundColor: '#fff',
        marginBottom: hp('6%'),
        overflow: 'hidden',
        width: wp('90%'),
        alignSelf: 'center',
        borderColor: '#ddd',
        borderWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: hp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -wp('5%') }, { translateY: -wp('5%') }],
        fontSize: wp('10%'),
        color: 'limegreen',
    },
    cardTitle: {
        color: 'white',
        fontSize: wp('6%'),
        fontWeight: 'bold',
        position: 'absolute',
        top: hp('2%'),
        left: wp('2%'),
    },
    cardContent: {
        alignItems: 'center',
        padding: wp('2%'),
        flexDirection: 'row',
    },
    cardText: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#192126',
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImage: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('4%'),
        marginRight: wp('2%'),
    },
    durationContainer: {
        marginLeft: wp('10%'),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: hp('0.9%'),
        paddingHorizontal: wp('3%'),
        borderRadius: wp('2%'),
    },
    durationIcon: {
        fontSize: wp('4%'),
        color: '#192126',
        marginRight: wp('1%'),
    },
    durationText: {
        fontSize: wp('4%'),
        color: '#192126',
    },
});

export default VideoCardComponent;
