import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import globalStyles from '../styles';
import CustomDatePicker from '../../../../shared/Component/CustomDatePicker';
import SelectedTouchableButton from '../../../../components/SelectedTouchableButton';
import CustomButton from '../../../../shared/Component/CustomButton';

interface FilterModalProps {
  closeModal: () => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedClub: string | null;
  setSelectedClub: (club: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  closeModal,
  selectedDate,
  setSelectedDate,
  selectedClub,
  setSelectedClub,
}) => {
  const handlePress = (option: string) => {
    setSelectedClub(option);
  };

  return (
    <View style={globalStyles.modalContent}>
      <View style={globalStyles.handle} />
      <ScrollView>
        <Text style={globalStyles.modalTitle}>Filters</Text>
        <Text style={globalStyles.modalDateLabel}>Date</Text>
        <View style={globalStyles.datePickerContainer}>
          <CustomDatePicker
            date={selectedDate || new Date()}
            onConfirm={date => setSelectedDate(date)}
          />
        </View>
        <Text style={globalStyles.modalClubLabel}>Clubs</Text>
        <View style={globalStyles.clubOptions}>
          <SelectedTouchableButton
            text="Driver"
            imageSource={require('../../../../assets/Images/Driver.png')}
            iconPosition="left"
            isSelected={selectedClub === 'Driver'}
            onPress={() => handlePress('Driver')}
          />
          <SelectedTouchableButton
            text="Woods"
            imageSource={require('../../../../assets/Images/Woods.png')}
            iconPosition="left"
            isSelected={selectedClub === 'Woods'}
            onPress={() => handlePress('Woods')}
          />
          <SelectedTouchableButton
            text="Irons"
            imageSource={require('../../../../assets/Images/Irons.png')}
            iconPosition="left"
            isSelected={selectedClub === 'Irons'}
            onPress={() => handlePress('Irons')}
          />
          <SelectedTouchableButton
            text="Wedges"
            imageSource={require('../../../../assets/Images/Wedges.png')}
            iconPosition="left"
            isSelected={selectedClub === 'Wedges'}
            onPress={() => handlePress('Wedges')}
          />
          <SelectedTouchableButton
            text="Drivers"
            imageSource={require('../../../../assets/Images/Driver.png')} // Adjust the path to your image
            iconPosition="left"
            isSelected={selectedClub === 'Drivers'}
            onPress={() => handlePress('Drivers')}
          />
        </View>

        <View>
          <CustomButton title="Apply Filters" onPress={closeModal} />
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterModal;
