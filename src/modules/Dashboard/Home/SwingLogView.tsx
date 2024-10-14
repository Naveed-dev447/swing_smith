import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {SwingCard} from './Common/Common';
import globalStyles from './styles';
import {Header} from './Common/Common';
import Modal from 'react-native-modal';
import FilterModal from './Common/FilterModal';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from 'redux/store';
import {fetchSwingLogs} from '../../../redux/Slices/SwingLogSlice';
import ProgressLoader from '../../../components/ProgressLoader';
import * as util from '../../../shared/Utils/CommonUtils';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const SwingLogView: React.FC = (props: any) => {
  const {navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const {profiles, profileLoading, profileError} = useSelector(
    (state: RootState) => state.profile,
  );
  const userName = profiles.length > 0 ? profiles[0].name : 'User';

  const dispatch = useDispatch<AppDispatch>();
  const {swingLogs, loading} = useSelector(
    (state: RootState) => state.swingLogs,
  );

  useEffect(() => {
    dispatch(fetchSwingLogs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredLogs(swingLogs);
  }, [swingLogs]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const applyFilters = () => {
    let filtered = swingLogs;

    if (selectedDate) {
      console.log('Selected Date:', util.formatDate(selectedDate));

      filtered = filtered.filter(log => {
        const logDate = new Date(log.created_at).toLocaleDateString();
        const selectedFormattedDate = selectedDate.toLocaleDateString();
        return logDate === selectedFormattedDate;
      });
    }

    if (selectedClub) {
      filtered = filtered.filter(log => log.club === selectedClub);
    }

    console.log('Filtered Logs based on date:', filtered);

    setFilteredLogs(filtered);
    toggleModal();
  };

  const resetFilters = () => {
    setSelectedDate(null); 
    setSelectedClub(null); 
    setFilteredLogs(swingLogs);
  };

  const refreshData = () => {
    dispatch(fetchSwingLogs());
  };

  if (loading) {
    return <ProgressLoader />;
  }

  const renderItem = ({item}: {item: any}) => {
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
        type={item.club ? item.club : 'Iron'}
        shot={item.face_direction === 'up' ? 'FO' : 'DTL'}
        navigate={() => navigation.navigate('AnalysisView', item)}
      />
    );
  };

  return (
    <View style={globalStyles.container}>
      <Header toggleModal={() => setFilteredLogs(swingLogs)} name={``} />
      <View style={globalStyles.swingLogFIlterIconContainer}>
        <Text style={globalStyles.header}>Your Swing Log</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require('../../../assets/Images/filter.png')}
            style={globalStyles.filterIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={refreshData} style={{ marginLeft: 20, }}>
          <Icon
            name="refresh"
            size={20} 
            color="black" 
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
          <Text
            style={{
              color: '#333',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10,
            }}>
            No Swing Logs History Available
          </Text>

          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 20,
            }}>
            Press icon to reset filter
          </Text>

          <TouchableOpacity onPress={resetFilters}>
            <Icon
              name="refresh"
              size={50}
              color="black"
              style={{
                padding: 10,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
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
