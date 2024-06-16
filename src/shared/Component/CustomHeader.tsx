import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type CustomHeaderProps = {
    title?: string;
    onBackPress: () => void;
};

const GlobalHeader: React.FC<CustomHeaderProps> = ({ title, onBackPress }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onBackPress}>
                <Image source={"add back icon here"}/>
            </TouchableOpacity>
            {title && <Text style={styles.headerText}>{title}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp('5%'),
        backgroundColor: '#fff',
    },
    headerIcon: {
        width: wp('6%'),
        height: wp('6%'),
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default GlobalHeader;