import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>Do you want to sign out ?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.okButton} onPress={onLogout}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  okButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#BBF246',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  okButtonText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default LogoutModal;
