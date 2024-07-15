import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
};

const GlobalButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
    const handlePress = () => {
        const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
        };
        ReactNativeHapticFeedback.trigger("impactLight", options);
        onPress();
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        padding: hp('2%'),
        borderRadius: wp('20%'),
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily:'Inter-SemiBold',
        fontSize: wp('4%'),
    },
});

export default GlobalButton;
