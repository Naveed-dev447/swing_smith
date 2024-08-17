import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SwingCard } from './Common/Common';
import globalStyles from './styles';
import { Header } from './Common/Common';
import Modal from 'react-native-modal';
import FilterModal from './Common/FilterModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { fetchSwingLogs } from '../../../redux/Slices/SwingLogSlice';
import ProgressLoader from '../../../components/ProgressLoader';
import * as util from '../../../shared/Utils/CommonUtils';

const SwingLogView: React.FC = (props: any) => {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { swingLogs, loading } = useSelector(
    (state: RootState) => state.swingLogs,
  );

  useEffect(() => {
    dispatch(fetchSwingLogs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredLogs(swingLogs); // Initially show all logs
  }, [swingLogs]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const applyFilters = () => {
    let filtered = swingLogs;

    if (selectedDate) {
      filtered = filtered.filter(log =>
        util.formatDate(log.created_at) === util.formatDate(selectedDate)
      );
    }

    if (selectedClub) {
      filtered = filtered.filter(log => log.club === selectedClub);
    }

    setFilteredLogs(filtered);
    toggleModal();
  };

  if (loading) {
    return <ProgressLoader />;
  }

  const renderItem = ({ item }: { item: any }) => {
    let swingAnalysisText;
    if (typeof item.swing_analysis === 'object') {
      swingAnalysisText = Object.entries(item.swing_analysis)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    } else {
      swingAnalysisText = item.swing_analysis;
    }

    return (
      <SwingCard
        score={item.swing_rating}
        date={util.formatDate(item.created_at)}
        description={swingAnalysisText}
        type={'Iron'}
        shot={'DTL'}
        navigate={() => navigation.navigate('AnalysisView', item.id)}
      />
    );
  };

  return (
    <View style={globalStyles.container}>
      <Header
        toggleModal={() => setFilteredLogs(swingLogs)}
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
      {filteredLogs && filteredLogs.length > 0 ? (
        <FlatList
          data={filteredLogs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={globalStyles.SwingLogScrollView}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No Swing Logs History Available</Text>
        </View>
      )}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={globalStyles.modal}>
        <FilterModal
          closeModal={applyFilters}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedClub={selectedClub}
          setSelectedClub={setSelectedClub}
        />
      </Modal>
    </View>
  );
};

export default SwingLogView;
