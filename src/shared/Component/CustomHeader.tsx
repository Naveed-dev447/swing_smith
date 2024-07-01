import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const goBackIcon = require('../../assets/Images/goBackIcon.png');

type CustomHeaderProps = {
  onBackPress: () => void;
  title?: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({onBackPress, title}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <View style={styles.iconContainer}>
          <Image source={goBackIcon} style={styles.headerIcon} />
        </View>
      </TouchableOpacity>
      {title && <Text style={styles.headerTitle}>{title}</Text>}
      <View style={styles.rightSpacer} />

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('7%'),
    paddingHorizontal: wp('5%'),
    justifyContent: 'space-between', 

  },
  backButton: {
    padding: wp('1%'),
  },
  iconContainer: {
    width: wp('5%'),
    height: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginLeft: wp('3%'),
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  rightSpacer: { 
    width: wp('10%'),
  },
});

export default CustomHeader;
