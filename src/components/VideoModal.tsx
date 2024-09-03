// import React from 'react';
// import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Video from 'react-native-video';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// interface VideoModalProps {
//   visible: boolean;
//   onClose: () => void;
//   videoUri: string;
//   title: string;
// }

// const VideoModal: React.FC<VideoModalProps> = ({
//   visible,
//   onClose,
//   videoUri,
//   title,
// }) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}>
//       <View style={styles.modalView}>
//         <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//           <Text style={styles.closeButtonText}>X</Text>
//         </TouchableOpacity>
//         <Video
//           source={{ uri: videoUri }}
//           style={styles.videoPlayer}
//           controls={true}
//         />
//         {/* <Text style={styles.title}>{title}</Text> */}
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.8)',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: wp('30%'),
//     right: wp('5%'),
//     zIndex: 1,
//     backgroundColor: 'rgba(0,0,0,0.8)',
//     borderRadius: wp('6%'),
//     paddingHorizontal: wp('3%'),
//     paddingVertical: wp('1%'),
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: wp('6%'),
//   },
//   videoPlayer: {
//     width: wp('90%'),
//     height: wp('70%'),
//   },
//   title: {
//     color: 'white',
//     fontSize: wp('5%'),
//     marginTop: wp('2%'),
//     textAlign: 'center',
//   },
// });

// export default VideoModal;

import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
          resizeMode="contain" // or "cover" depending on your preference
          fullscreen={true} // Enables full-screen video
          fullscreenOrientation="landscape" // Orientation in full-screen mode
        />
        {/* <Text style={styles.title}>{title}</Text> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: wp('8%'),
    right: wp('5%'),
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: wp('6%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('1%'),
  },
  closeButtonText: {
    color: 'white',
    fontSize: wp('6%'),
  },
  videoPlayer: {
    width: Dimensions.get('window').width, // Use the entire screen width
    height: Dimensions.get('window').height, // Use the entire screen height
  },
  title: {
    color: 'white',
    fontSize: wp('5%'),
    marginTop: wp('2%'),
    textAlign: 'center',
  },
});

export default VideoModal;
