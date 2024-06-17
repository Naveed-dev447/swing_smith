import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type CustomHeaderProps = {
    title?: string;
    onBackPress: () => void;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, onBackPress }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onBackPress}>
                <Icon name='arrow-back-ios' size={24} style={styles.headerIcon}/>
            </TouchableOpacity>
            {title && <Text style={styles.headerText}>{title}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('2%'),
        padding: wp('5%'),
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    headerIcon: {
        width: wp('6%'),
        height: wp('6%'),
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: wp('2%'),
    },
});

export default CustomHeader;
