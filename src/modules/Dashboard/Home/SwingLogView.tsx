// // App.tsx
// import React from 'react';
// import { SafeAreaView, ScrollView } from 'react-native';
// import {Header, SwingLog} from './Common/Common'

// import styles from './styles';

// const SwingLogView = () => {
//   // return (





    
//   //   <SafeAreaView style={styles.container}>
//   //   <Header toggleModal={toggleModal} name={'Hello, Dilshan'} address={'Kandy, Sri Lanka'}/>
//   //     <ScrollView>
//   //       <SwingLog score="7.2" analysis="The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet." date="Jan 10" />
//   //       <SwingLog score="7.2" analysis="The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet." date="Jan 10" />
//   //     </ScrollView>
//   //   </SafeAreaView>
//   // );
// };

// export default SwingLogView;


import React,{useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SwingCard } from './Common/Common';
import globalStyles from './styles';
import { Header } from './Common/Common';
const SwingLogView: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const checkFavourite = () => {
    setFavourite(!favourite)
  }
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const data = [
    {
      score: 7.2,
      date: 'Jan 10',
      description: 'The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet.',
      type: 'Iron',
      shot: 'DTL'
    },
    {
      score: 7.2,
      date: 'Jan 10',
      description: 'The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet.',
      type: 'Iron',
      shot: 'DTL'
    }
  ];

  return (
    
    <ScrollView style={globalStyles.container}>
    <Header toggleModal={toggleModal}/>
      <Text style={globalStyles.header}>Your Swing Log</Text>
      {data.map((item, index) => (
        <SwingCard
          key={index}
          score={item.score}
          date={item.date}
          description={item.description}
          type={item.type}
          shot={item.shot}
          favourite={favourite}
          onPress={checkFavourite}
        />
      ))}
    </ScrollView>
  );
};

export default SwingLogView;