import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import globalStyles from '../styles';
import CustomDatePicker from '../../../../shared/Component/CustomDatePicker';
import SelectedTouchableButton from '../../../../components/SelectedTouchableButton';
import CustomButton from '../../../../shared/Component/CustomButton';

const FilterModal: React.FC<{closeModal: () => void}> = ({closeModal}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('Driver');
  const handlePress = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={globalStyles.modalContent}>
      <View style={globalStyles.handle} />
      <ScrollView >
        <Text style={globalStyles.modalTitle}>Filters</Text>
        <Text style={globalStyles.modalDateLabel}>Date</Text>
        <View style={globalStyles.datePickerContainer}>
          <CustomDatePicker
            date={selectedDate}
            onConfirm={date => setSelectedDate(date)}
          />
        </View>
        <Text style={globalStyles.modalClubLabel}>Clubs</Text>
        <View style={globalStyles.clubOptions}>
          <SelectedTouchableButton
            text="Driver"
            imageSource={require('../../../../assets/Images/Driver.png')} // Adjust the path to your image
            iconPosition="left"
            isSelected={selectedOption === 'Driver'}
            onPress={() => handlePress('Driver')}
          />
          <SelectedTouchableButton
            text="Woods"
            imageSource={require('../../../../assets/Images/Woods.png')} // Adjust the path to your image
            iconPosition="left"
            isSelected={selectedOption === 'Woods'}
            onPress={() => handlePress('Woods')}
          />
          <SelectedTouchableButton
            text="Irons"
            imageSource={require('../../../../assets/Images/Irons.png')} // Adjust the path to your image
            iconPosition="left"
            isSelected={selectedOption === 'Irons'}
            onPress={() => handlePress('Irons')}
          />
          <SelectedTouchableButton
            text="Wedges"
            imageSource={require('../../../../assets/Images/Wedges.png')} // Adjust the path to your image
            iconPosition="left"
            isSelected={selectedOption === 'Wedges'}
            onPress={() => handlePress('Wedges')}
          />
          <SelectedTouchableButton
            text="Drivers"
            imageSource={require('../../../../assets/Images/Driver.png')} // Adjust the path to your image
            iconPosition="left"
            isSelected={selectedOption === 'Drivers'}
            onPress={() => handlePress('Drivers')}
          />
        </View>

        <View>
          <CustomButton title="Next" onPress={closeModal} />
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterModal;
