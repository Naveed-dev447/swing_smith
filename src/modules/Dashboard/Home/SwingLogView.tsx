import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SwingCard } from './Common/Common';
import globalStyles from './styles';
import { Header } from './Common/Common';
import Modal from 'react-native-modal';
import FilterModal from './Common/FilterModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { fetchSwingLogs } from '../../../redux/Slices/SwingLogSlice'
import * as Progress from 'react-native-progress';
import * as util from '../../../shared/Utils/CommonUtils'
import ProgressLoader from '../../../components/ProgressLoader';


const SwingLogView: React.FC = (props: any) => {
  const { routes, navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { swingLogs, loading, error } = useSelector((state: RootState) => state.swingLogs);

  React.useEffect(() => {
    dispatch(fetchSwingLogs());
  }, [dispatch]);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  if (loading) {
    return <ProgressLoader />;
  }



  return (
    <View style={globalStyles.container}>
      <Header
        toggleModal={() => console.log('tiles pressed')}
        name={''}
        address={''}
      />
      <View style={globalStyles.swingLogFIlterIconContainer}>
        <Text style={globalStyles.header}>Your Swing Log</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require('../../../assets/Images/filter.png')}
            style={globalStyles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={globalStyles.SwingLogScrollView}>
        {swingLogs.map((item, index) => (
          <SwingCard
            key={index}
            score={item.swing_rating}
            date={util.formatDate(item.created_at)}
            description={item.swing_analysis}
            type={'Iron'}
            shot={'DTL'}
            navigate={() => navigation.navigate('AnalysisView', item.id)}
          />
        ))}
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={globalStyles.modal}>
        <FilterModal closeModal={toggleModal} />
      </Modal>
    </View>
  );
};

export default SwingLogView;
