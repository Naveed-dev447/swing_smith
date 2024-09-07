import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';
import CustomButton from '../../shared/Component/CustomButton';
import globalStyles from '../../modules/Onboarding/styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { goBack } from '../../shared/Utils/navigationRef';

const paymentImage = require('../../assets/Images/pay_icon.png');


const SubscriptionScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={{ padding: wp('5%'), }}>
        <TouchableOpacity style={styles.closeButton} onPress={goBack}>
          <Icon name="x" size={24} color="#000" />
        </TouchableOpacity>
        <ImageBackground
          source={paymentImage}
          style={styles.image}
          borderRadius={15}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>Get Your Best <Text style={styles.highlight}>Body!</Text></Text>
            <Text style={styles.subtitle}>
              Select body parts and duration, and get a workout just for you
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.benefitsContainer}>
          <View style={styles.benefit}>
            <Icon name="check-circle" size={20} color="green" />
            <Text style={styles.benefitText}> Improve golf by AI generated analysis</Text>
          </View>
          <View style={styles.benefit}>
            <Icon name="check-circle" size={20} color="green" />
            <Text style={styles.benefitText}> Target all your problem areas</Text>
          </View>
          <View style={styles.benefit}>
            <Icon name="check-circle" size={20} color="green" />
            <Text style={styles.benefitText}> Boost your body confidence</Text>
          </View>
        </View>
        <View style={styles.plansContainer}>
          <View style={styles.plan}>
            <Text style={styles.planType}>Monthly</Text>
            <Text style={styles.price}>$20.00</Text>
            <Text style={styles.billing}>Billed Monthly</Text>
          </View>
          <View style={styles.plan}>
            <Text style={styles.planType}>Yearly</Text>
            <Text style={styles.price}>$200.00</Text>
            <Text style={styles.save}>Save $40.00</Text>
            <Text style={styles.billing}>Free 1 Week Trial</Text>
          </View>
        </View>
        <Text style={styles.agreement}>
          By continuing, you agree to
          <Text style={styles.link}> Privacy Policy </Text>
          and
          <Text style={styles.link}> Terms & Condition</Text>
        </Text>
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton title="Start Plan For Free" onPress={() => console.log('here')} />
      </View>
    </View>
  );
};

export default SubscriptionScreen;
