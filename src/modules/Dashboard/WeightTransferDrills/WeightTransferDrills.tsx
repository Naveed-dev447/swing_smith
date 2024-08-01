// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
// import CustomButton from '../../../shared/Component/CustomButton';
// import CustomHeader from '../../../shared/Component/CustomHeader';
// import globalStyles from '../../Onboarding/styles';
// import styles from './WeightTransferDrillStyles';
// import { HorizontalScroll, Section } from '../Home/Common/Common';
// import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
// import { useSelector } from 'react-redux';
// import { RootState } from 'redux/store';
// import VideoModal from '../../../components/VideoModal';

// const WeightTransferDrill: React.FC = (props: any) => {
//   const { navigation } = props;
//   const { tutorials, loading, error } = useSelector((state: RootState) => state.tutorials);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState<{
//     uri: string;
//     title: string;
//   } | null>(null);

//   const handleVideoPress = (uri: string, title: string) => {
//     setSelectedVideo({ uri, title });
//     setModalVisible(true);
//   };

//   const handleNextPress = () => {};

//   return (
//     <View style={globalStyles.container}>
//       <CustomHeader
//         onBackPress={navigation.goBack}
//         title="Weight Transfer Drill"
//       />
//       <ScrollView contentContainerStyle={styles.scrollContentContainer}>
//         <>
//           <Section title="Recommended Tutorials">
//             <HorizontalScroll>
//               {tutorials?.map((item, index) => (
//                 <TutorialCard
//                   key={index}
//                   data={item}
//                   onPress={() => handleVideoPress(item.file_name, item.description)}
//                 />
//               ))}
//             </HorizontalScroll>
//           </Section>
//         </>
//         <View style={styles.instructionContainer}>
//           <View style={styles.instructionHeader}>
//             <Text style={styles.instructionTitle}>Drill Instructions</Text>
//             <Image
//               source={require('../../../assets/Images/info.png')}
//               style={styles.infoIcon}
//             />
//           </View>
//           <Text style={styles.instructionText}>
//             Place a tee behind your left heel (for a right-handed golfer) and
//             practice transferring your weight smoothly from your back foot to
//             your front foot during your swing.
//           </Text>
//         </View>
//         <Section title="Recommended Tutorials">
//           <HorizontalScroll>
//             {tutorials.map((item, index) => (
//               <TutorialCard
//                 key={index}
//                 data={item}
//                 onPress={() => handleVideoPress(item.file_name, item.description)}
//               />
//             ))}
//           </HorizontalScroll>
//         </Section>
//         <View style={styles.buttonContainer}>
//           <CustomButton title="Completed" onPress={handleNextPress} />
//         </View>
//       </ScrollView>
//       {selectedVideo && (
//         <VideoModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           videoUri={selectedVideo.uri}
//           title={selectedVideo.title}
//         />
//       )}
//     </View>
//   );
// };

// export default WeightTransferDrill;





import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any vector icon library
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/Slices/AuthSlice';
import { AppDispatch } from '../../../redux/store';
import globalStyles from '../../Onboarding/styles';
import CustomHeader from '../../../shared/Component/CustomHeader';
import styles from './WeightTransferDrillStyles';

const WeightTransferDrill: React.FC = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigation.navigate('Login');
    });
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader
        onBackPress={navigation.goBack}
        title="Logout"
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default WeightTransferDrill;

