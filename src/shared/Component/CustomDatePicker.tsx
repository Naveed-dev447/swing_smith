import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HapticFeedback from 'react-native-haptic-feedback';
import { format } from 'date-fns';


const CustomDatePicker: React.FC<{
  date: Date;
  onConfirm: (date: Date) => void;
}> = ({ date, onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    HapticFeedback.trigger('impactLight');
    setOpen(false);
    onConfirm(selectedDate);
  };

  const handleDateChange = () => {
    console.log('Date changed');
    HapticFeedback.trigger('impactLight');
  };

  return (
    <View>
      <TouchableOpacity style={styles.dateInput} onPress={() => setOpen(true)}>
        <Icon name="calendar" size={20} color="black" />
        <Text style={styles.dateText}>{format(date, 'dd MMM, yyyy')}</Text>

      </TouchableOpacity>
      {open && (
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onDateChange={handleDateChange}
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('3%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: wp('2%'),
    marginTop: 10,
  },
  dateText: {
    color: '#192126',
    fontSize: wp('4%'),
    fontFamily:'Outfit-SemiBold',
    marginLeft: wp('2%'),
  },
});

export default CustomDatePicker;

