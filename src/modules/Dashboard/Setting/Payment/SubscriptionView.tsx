// SubscriptionScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import styles from './style';
import CustomButton from '../../../../shared/Component/CustomButton';
import globalStyles from '../../../Onboarding/styles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { goBack } from '../../../../shared/Utils/navigationRef';
import SubscriptionAPICall from './SubscriptionAPICall';

const paymentImage = require('../../../../assets/Images/pay_icon.png');

const SubscriptionScreen: React.FC = (props: any) => {
  const { navigation, route } = props;
  const { params } = route;

  const { createPaymentMethod } = useStripe();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [email, setEmail] = useState('rizwan@gmail.com'); // Replace with the user's email
  const [loading, setLoading] = useState(false);

  const handleSubscription = async () => {
    setLoading(true);

    const { paymentMethod, error: createPaymentMethodError } = await createPaymentMethod({
      paymentMethodType: 'Card'
    });

    if (createPaymentMethodError) {
      Alert.alert(`Error: ${createPaymentMethodError.message}`);
      setLoading(false);
      return;
    }

    const paymentMethodId = paymentMethod.id;

    try {
      await SubscriptionAPICall({
        plan: selectedPlan,
        email: params.email,
        paymentMethodId: paymentMethodId
      });

    } catch (error) {
    } finally {
      setLoading(false);
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
            <TouchableOpacity
              style={[styles.plan, selectedPlan === 'monthly' && styles.selectedPlan]}
              onPress={() => setSelectedPlan('monthly')}
            >
              <Text style={styles.planType}>Monthly</Text>
              <Text style={styles.price}>$20.00</Text>
              <Text style={styles.billing}>Billed Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.plan, selectedPlan === 'yearly' && styles.selectedPlan]}
              onPress={() => setSelectedPlan('yearly')}
            >
              <Text style={styles.planType}>Yearly</Text>
              <Text style={styles.price}>$200.00</Text>
              <Text style={[styles.save, { color: selectedPlan === 'yearly' ? '#192126' : '#4CAF50' }]}>Save $40.00</Text>
              <Text style={styles.billing}>Free 1 Week Trial</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardFieldContainer}>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
                expiry: 'MM/YY',
                cvc: 'CVC'
              }}
              cardStyle={{
                backgroundColor: '#f8f9fa',
                textColor: '#212529',
                borderColor: '#ced4da',
                borderWidth: 1,
                borderRadius: 8,
              }}
              style={styles.cardField}
              onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
              }}
            />
          </View>

          <Text style={styles.agreement}>
            By continuing, you agree to
            <Text style={styles.link}> Privacy Policy </Text>
            and
            <Text style={styles.link}> Terms & Condition</Text>
          </Text>
        </View>
        <View style={globalStyles.buttonContainer}>
          <CustomButton title="Start Plan For Free" onPress={handleSubscription} loading={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SubscriptionScreen;
