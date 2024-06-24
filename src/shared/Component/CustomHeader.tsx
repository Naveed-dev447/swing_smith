import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const goBackIcon = require('../../assets/Images/goBackIcon.png');

type CustomHeaderProps = {
  onBackPress: () => void;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({onBackPress}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <View style={styles.iconContainer}>
          <Image source={goBackIcon} style={styles.headerIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('5%'),
    paddingHorizontal: wp('5%'),
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
});

export default CustomHeader;
