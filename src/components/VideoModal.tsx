import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';

interface VideoModalProps {
  visible: boolean;
  onClose: () => void;
  videoUri: string;
  title: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  visible,
  onClose,
  videoUri,
  title,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Video
          source={{ uri: videoUri }}
          style={styles.videoPlayer}
          controls={true}
          resizeMode="contain"
        />
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
  },
  videoPlayer: {
    width: width,  // Full width
    height: height, // Full height
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default VideoModal;
