// SubscriptionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CardField, usePaymentSheet, useStripe } from '@stripe/stripe-react-native';
import styles from './style';
import CustomButton from '../../../../shared/Component/CustomButton';
import globalStyles from '../../../Onboarding/styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { goBack } from '../../../../shared/Utils/navigationRef';

const paymentImage = require('../../assets/Images/pay_icon.png');

const SubscriptionScreen: React.FC = () => {
  const { confirmPayment } = useStripe();
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()
  const [ready, setReady] = useState(false);


  useEffect(() => {
    initialisePaymentSheet();
  }, [])

  const initialisePaymentSheet = async () => {
    const paymentIntentClientSecret = 'pi_3PxFJECNNJb7RDVD0xmlW5nf_secret_GDoxfZdnchyMQtQeonQBhTZUB';

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret,
      merchantDisplayName: 'Swing Smith',
      allowsDelayedPaymentMethods: true,
      returnURL: 'stripe-example://stripe-redirect',
    });

    if (!error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      setReady(true);
    }
    // const {paymentIntent, empheralKey, customer} = await fetchPaymentSheetParams();

    // const {error} = await initPaymentSheet({
    //   customerId: customer,
    //   customerEphemeralKeySecret: empheralKey,
    //   paymentIntentClientSecret: paymentIntent,
    //   merchantDisplayName: "Swing Smith",
    //   allowsDelayedPaymentMethods: true,
    //   returnURL: 'stripe-example://stripe-redirect',
    // })
    // if (!error) {
    //   Alert.alert(`Error code: ${error.code}`, error.message)
    // } else {
    //   setReady(true);
    // }
  }

  const fetchPaymentSheetParams = async () => {
    const response = await fetch('API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, empheralKey, customer } = await response.json();
    return { paymentIntent, empheralKey, customer };
  }

  const handlePayment = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Alert.alert(`Success: The payment was confirmed successfully`);
      setReady(false)
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}>
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
            <TouchableOpacity style={styles.plan} >
              <Text style={styles.planType}>Monthly</Text>
              <Text style={styles.price}>$20.00</Text>
              <Text style={styles.billing}>Billed Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.plan}>
              <Text style={styles.planType}>Yearly</Text>
              <Text style={styles.price}>$200.00</Text>
              <Text style={styles.save}>Save $40.00</Text>
              <Text style={styles.billing}>Free 1 Week Trial</Text>
            </TouchableOpacity>
          </View>
          {/* {showCardField && (
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
              }}
            />
          )} */}
          <Text style={styles.agreement}>
            By continuing, you agree to
            <Text style={styles.link}> Privacy Policy </Text>
            and
            <Text style={styles.link}> Terms & Condition</Text>
          </Text>
        </View>
        <View style={globalStyles.buttonContainer}>
          <CustomButton title="Start Plan For Free" onPress={handlePayment} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;
