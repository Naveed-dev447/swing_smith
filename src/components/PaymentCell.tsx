import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface PaymentCellProps {
  label: string;
  value: string;
  valueStyle?: TextStyle;
}

const PaymentCell: React.FC<PaymentCellProps> = ({ label, value, valueStyle }) => {
  return (
    <View style={styles.cellContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('4%'),
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('90%'),
    margin: hp('1%'),
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Shadow properties for Android
    elevation: 3,
  },
  label: {
    fontSize: wp('4%'),
    color: '#666',
  },
  value: {
    fontSize: wp('4%'),
    color: '#333',
  },
});

export default PaymentCell;
