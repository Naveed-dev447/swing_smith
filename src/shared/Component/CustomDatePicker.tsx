import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDatePicker: React.FC<{
  date: Date;
  onConfirm: (date: Date) => void;
}> = ({date, onConfirm}) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.dateInput} onPress={() => setOpen(true)}>
        <Icon name="calendar" size={20} color="black" />
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {open && (
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={selectedDate => {
            setOpen(false);
            onConfirm(selectedDate);
          }}
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
    marginTop: 10, // Added margin for spacing
  },
  dateText: {
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
  },
});

export default CustomDatePicker;
