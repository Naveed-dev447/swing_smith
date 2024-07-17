import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {SwingCard} from './Common/Common';
import globalStyles from './styles';
import {Header} from './Common/Common';
import Modal from 'react-native-modal';
import FilterModal from './Common/FilterModal';

const SwingLogView: React.FC = (props: any) => {
  const {routes, navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [favourite, setFavourite] = useState(false);

  const checkFavourite = () => {
    setFavourite(!favourite);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const data = [
    {
      score: 7.2,
      date: 'Jan 10',
      description:
        'The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet.',
      type: 'Iron',
      shot: 'DTL',
    },
    {
      score: 7.2,
      date: 'Jan 10',
      description:
        'The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet.',
      type: 'Iron',
      shot: 'DTL',
    },
  ];

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
        {data.map((item, index) => (
          <SwingCard
            key={index}
            score={item.score}
            date={item.date}
            description={item.description}
            type={item.type}
            shot={item.shot}
            navigate={() => navigation.navigate('AnalysisView')}
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
