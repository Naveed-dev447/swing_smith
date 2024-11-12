import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import globalStyles from '../styles';
import CustomDatePicker from '../../../../shared/Component/CustomDatePicker';
import SelectedTouchableButton from '../../../../components/SelectedTouchableButton';
import CustomButton from '../../../../shared/Component/CustomButton';

interface FilterModalProps {
  closeModal: () => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  selectedClubs: string[];
  setSelectedClubs: (clubs: string[]) => void;
}

const clubImages: { [key: string]: any } = {
  Driver: require('../../../../assets/Images/Driver.png'),
  Woods: require('../../../../assets/Images/Woods.png'),
  Irons: require('../../../../assets/Images/Irons.png'),
  Wedges: require('../../../../assets/Images/Wedges.png'),
  Putter: require('../../../../assets/Images/Putter.png'),
};

const FilterModal: React.FC<FilterModalProps> = ({
  closeModal,
  selectedDate,
  setSelectedDate,
  selectedClubs,
  setSelectedClubs,
}) => {
  const handlePress = (club: string) => {
    // Toggle club selection: add if not selected, remove if already selected
    setSelectedClubs(prevClubs => {
      if (prevClubs.includes(club)) {
        return prevClubs.filter(item => item !== club); // Remove club
      } else {
        return [...prevClubs, club]; // Add club
      }
    });
  };

  // Function to clear filters (reset date and selected clubs)
  const handleClearFilters = () => {
    setSelectedDate(null); // Reset to default date
    setSelectedClubs([]);  // Clear selected clubs
  };

  return (
    <View style={globalStyles.modalContent}>
      <View style={globalStyles.handle} />
      <ScrollView>
        <Text style={globalStyles.modalTitle}>Filters</Text>
        <Text style={globalStyles.modalDateLabel}>Date</Text>
        <View style={globalStyles.datePickerContainer}>
          <CustomDatePicker
            date={selectedDate || new Date()}  // Default to current date if no selected date
            onConfirm={date => setSelectedDate(date)}  // Update selected date
          />
        </View>
        <Text style={globalStyles.modalClubLabel}>Clubs</Text>
        <View style={globalStyles.clubOptions}>
          {['Driver', 'Woods', 'Irons', 'Wedges', 'Putter'].map(club => (
            <SelectedTouchableButton
              key={club}
              text={club}
              imageSource={clubImages[club]}  // Use mapped value for image source
              iconPosition="left"
              isSelected={selectedClubs.includes(club)}  // Check if club is selected
              onPress={() => handlePress(club)}  // Handle club toggle
            />
          ))}
        </View>
        
        {/* Clear Filter Button */}
        <View style={{marginBottom:6}}>
          <CustomButton title="Clear Filter" onPress={handleClearFilters} backgroundColor="#fafafa" textColor="#000" // Black text color
          />
        </View>

        {/* Apply Filter Button */}
        <View>
          <CustomButton title="Apply Filters" onPress={closeModal} />
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterModal;
