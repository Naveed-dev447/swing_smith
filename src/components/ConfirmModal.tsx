import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import goodByeImage from "../assets/Images/goodbye.png"

interface ConfirmationModalProps {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, message, onConfirm, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <Icon name="close" size={wp('6%')} color="#000" />
                    </TouchableOpacity>

                    <Image source={goodByeImage} style={styles.goodbyeText} />
                    <Text style={styles.header}> Subscription Cancelled</Text>

                    <Text style={styles.message}>{message}</Text>

                    <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        alignSelf: 'center',
        bottom: hp('4%'),
        backgroundColor: '#fff',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('5%'),
        borderRadius: wp('6%'),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    closeIcon: {
        position: 'absolute',
        top: wp('3%'),
        right: wp('5%'),
    },
    goodbyeText: {
        width: wp('15%'),
        height: hp('6%'),
        marginBottom: hp('2%')
    },
    header: {
        fontSize: wp('4%'),
        fontWeight: '600',
        fontFamily: "Outfit",
        color: '#192126',
    },
    message: {
        fontSize: wp('3.5%'),
        textAlign: 'center',
        color: '#666666',
        fontWeight: '400',
        fontFamily: "Outfit",
        marginVertical: hp('1%'),
    },
    confirmButton: {
        backgroundColor: '#BBF246',
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('30%'),
        borderRadius: wp('5%'),
        marginTop: hp('1.5%'),
    },
    confirmButtonText: {
        fontSize: wp('3.5%'),
        color: '#192126',
        fontFamily: 'Outfit',
        fontWeight: '600',
    },
});

export default ConfirmationModal;
