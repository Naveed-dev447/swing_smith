import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from '../styles';
import CustomDatePicker from '../../../../shared/Component/CustomDatePicker';
import SelectedTouchableButton from '../../../../assets/components/SelectedTouchableButton';
import CustomButton from '../../../../shared/Component/CustomButton';

const FilterModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('Driver');
  const handlePress = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={globalStyles.modalContent}>
      <View style={globalStyles.handle} />
      <ScrollView contentContainerStyle={globalStyles.scrollViewContent}>
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
            iconName="golf"
            isSelected={selectedOption === 'Driver'}
            onPress={() => handlePress('Driver')}
          />
          <SelectedTouchableButton
            text="Woods"
            iconName="golf"
            isSelected={selectedOption === 'Woods'}
            onPress={() => handlePress('Woods')}
          />
          <SelectedTouchableButton
            text="Irons"
            iconName="golf"
            isSelected={selectedOption === 'Irons'}
            onPress={() => handlePress('Irons')}
          />
          <SelectedTouchableButton
            text="Wedges"
            iconName="golf"
            isSelected={selectedOption === 'Wedges'}
            onPress={() => handlePress('Wedges')}
          />
          <SelectedTouchableButton
            text="Drivers"
            iconName="golf"
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
