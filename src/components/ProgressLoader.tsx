// src/components/Loader.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const ProgressLoader: React.FC = () => {
    return (
        <View style={styles.loaderContainer}>
            <Progress.Circle size={50} indeterminate={true} color='#9bde0b' />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333', // black
    },
});

export default ProgressLoader;
