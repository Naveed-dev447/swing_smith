import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = React.useState(true);

  const handleLoadStart = () => setLoading(true);
  const handleLoad = () => setLoading(false);
  const handleBuffer = ({ isBuffering }: { isBuffering: boolean }) => setLoading(isBuffering);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityLabel="Close Video Modal"
        >
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>

        {/* Loader overlay */}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        {/* Video Player */}
        <Video
          source={{ uri: videoUri }}
          style={styles.videoPlayer}
          resizeMode="contain"
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onBuffer={handleBuffer}
        />

        {/* Video Title */}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,  // Ensures loader is above the video
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Slight overlay for better visibility
  },
  videoPlayer: {
    width: width,
    height: height * 0.9,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default VideoModal;
