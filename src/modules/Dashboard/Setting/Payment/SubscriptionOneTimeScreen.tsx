import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Alert, TextInput, useColorScheme, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import styles from './style';
import CustomButton from '../../../../shared/Component/CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { goBack } from '../../../../shared/Utils/navigationRef';
import { SubscriptionAPICall, CouponValidationAPICall } from './SubscriptionAPICall';
import { ShowToast } from '../../../../components/ShowToast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useTheme } from '../../../../theme/theme';
import { fetchSubscriptionPlans } from '../../../../redux/Slices/SubscriptionPlan';
import ProgressLoader from '../../../../components/ProgressLoader';
import { FlatList } from 'react-native-gesture-handler';
import CustomHeader from '../../../../shared/Component/CustomHeader';

const paymentImage = require('../../../../assets/Images/pay_icon.png');

const SubscriptionScreen: React.FC = (props: any) => {
  const { navigation, route } = props;
  const { params } = route;
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, profileLoading, profileError } = useSelector(
    (state: RootState) => state.profile,
  );
  const { plans, loading: subscriptionPlanLoader, error } = useSelector((state: RootState) => state.subscriptionPlans);

  const userName = profiles.length > 0 ? profiles[0] : { email: 'Fresslab88@gmail.com', name: 'Mikor Burton' };

  const { createPaymentMethod } = useStripe();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>('');
  const [couponId, setCouponId] = useState<string | null>(null);
  const [couponData, setCouponData] = useState<any>(null);

  const baseValue = useMemo(() => {
    if (selectedPlan) {
      const plan = plans.find((p) => p.interval === selectedPlan);
      return plan ? plan.amount : 0;
    }
    return 0;
  }, [selectedPlan, plans]);

  const discountedValue = useMemo(() => {
    if (couponData) {
      if (couponData.amount_off !== null) {
        return (baseValue - couponData.amount_off / 100).toFixed(2);
      } else if (couponData.percent_off !== null) {
        return (baseValue - (baseValue * couponData.percent_off) / 100).toFixed(2);
      }
    }
    return baseValue.toFixed(2);
  }, [couponData, baseValue]);



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
      const subscriptionPayload: any = {
        plan: selectedPlan,
        email: userName.email,
        paymentMethodId: paymentMethodId,
      };

      if (couponId) {
        subscriptionPayload.couponCode = couponId;
      }

      await SubscriptionAPICall(subscriptionPayload);
      navigation.navigate('OnboardHome12')
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  const handleCouponValidation = async () => {
    if (!coupon) {
      ShowToast('error', "Please enter a coupon code !");
      return;
    }
    try {
      const response = await CouponValidationAPICall(coupon);
      console.log("COupon =====>", response);

      if (response.status === 200 && response.coupon?.id) {
        setCouponData(response.coupon);
        setCouponId(response.coupon.id);
        ShowToast('success', 'Coupon applied successfully!');
      } else {
        ShowToast('error', `${response.message}`);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || 'An error occurred';
      ShowToast('error', `${errorMessage}`);
    }
  };
  useEffect(() => {
    dispatch(fetchSubscriptionPlans()).unwrap();
  }, []);



  if (subscriptionPlanLoader) {
    return <ProgressLoader />;
  }



  const renderPlan = ({ item }) => (
    <TouchableOpacity
      style={[styles.plan, selectedPlan === item.interval && styles.selectedPlan]}
      onPress={() => setSelectedPlan(item.interval)}
    >
      <Text style={styles.planType}>{item.name}</Text>
      <Text style={styles.price}>${item.amount}.00</Text>
      <Text style={styles.billing}>Billed {item.interval === 'month' ? 'Monthly' : 'Yearly'}</Text>
      {selectedPlan === item.interval && (
        <View style={styles.checkMarkContainer}>
          <Ionicons name="ellipse" size={wp('6.5%')} color="#BBF246" />
          <FontAwesome
            name="check"
            size={wp('3.3%')}
            color="#192126"
            style={{ position: 'absolute' }}
          />
        </View>
      )}
      {item.interval === 'year' && (
        <Text
          style={[styles.save, { color: selectedPlan === 'yearly' ? '#192126' : '#4CAF50' }]}
        >
          Save $40.00
        </Text>
      )}
      {item.interval === 'year' && (
        <Text style={styles.billing}>Free 4 Analysis</Text>
      )}
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <CustomHeader onBackPress={goBack} title='' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}>
          <View style={styles.subscriptionView}>
            <Text style={styles.paymentHeader}>Unlimited Rewinds. Go back and try again!</Text>
            {/* <ImageBackground
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
            </ImageBackground> */}
            <Text style={styles.selectPlanText}>Select a plan</Text>
            <FlatList
              data={plans}
              renderItem={renderPlan}
              keyExtractor={(item) => item.interval}
              horizontal
              contentContainerStyle={styles.plansContainer}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.benefitsContainer}>
              <Text style={styles.topCenterLabel}>Included with Plus</Text>
              <View style={[styles.benefit, { paddingTop: 10 }]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="ellipse" size={wp('7%')} color="#BBF246" />
                  <FontAwesome
                    name="check"
                    size={wp('3.3%')}
                    color="#192126"
                    style={{ position: 'absolute' }}
                  />
                </View>
                <Text style={styles.benefitText}> Improve golf by AI generated analysis</Text>
              </View>
              <View style={styles.benefit}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="ellipse" size={wp('7%')} color="#BBF246" />
                  <FontAwesome
                    name="check"
                    size={wp('3.3%')}
                    color="#192126"
                    style={{ position: 'absolute' }}
                  />
                </View>
                <Text style={styles.benefitText}> Target all your problem areas</Text>
              </View>
              <View style={styles.benefit}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="ellipse" size={wp('7%')} color="#BBF246" />
                  <FontAwesome
                    name="check"
                    size={wp('3.3%')}
                    color="#192126"
                    style={{ position: 'absolute' }}
                  />
                </View>
                <Text style={styles.benefitText}> Boost your body confidence</Text>
              </View>
              <Text style={styles.benefitSubText}>Get instant access and see how it can change your life.</Text>
            </View>


            <SafeAreaView style={styles.cardFieldContainer}>
              <CardField
                postalCodeEnabled={false}
                placeholders={{
                  number: '4242 4242 4242 4242'
                }}
                cardStyle={{
                  backgroundColor: colorScheme === 'dark' ? '#2C2C2C' : '#f8f9fa', // Dark mode background
                  textColor: colorScheme === 'dark' ? '#FFFFFF' : '#212529', // Text color for dark mode
                  borderColor: colorScheme === 'dark' ? '#FFFFFF' : '#ced4da', // Border color for dark mode
                  borderWidth: 1,
                  borderRadius: 8,
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 16
                }}
                style={styles.cardField}
                onCardChange={(cardDetails) => {
                  // console.log('cardDetails', cardDetails);
                }}
              />
            </SafeAreaView>
            <View style={styles.couponView}>
              <View style={[styles.inputContainer]}>
                <TextInput
                  placeholder="Coupon Code"
                  value={coupon}
                  onChangeText={setCoupon}
                  style={[styles.inputStyle, { color: colors.text }]}
                  placeholderTextColor={colors.placeholder}
                />
                <TouchableOpacity
                  style={[
                    styles.couponButton,
                    { backgroundColor: couponId ? '#BBF246' : '#000' }
                  ]}
                  onPress={handleCouponValidation}
                  disabled={!!couponId} // Disable button if coupon is applied
                >
                  <Text style={[styles.couponText, { color: couponId ? '#000' : '#FFFFFF' }]}>
                    {couponId ? 'Applied' : 'Apply'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.agreement}>
              By continuing, you agree to
              <Text style={styles.link}> Privacy Policy </Text>
              and
              <Text style={styles.link}> Terms & Condition</Text>
            </Text>
            <View style={{ paddingTop: '10%' }}>
              <CustomButton
                title={selectedPlan ? `Continue – $${discountedValue} total` : 'Pay'}
                onPress={handleSubscription}
                loading={loading}
              />
            </View>
            <View style={{ paddingTop: '7%' }}>
              <CustomButton title="Skip" onPress={() => navigation.navigate('OnboardHome12')} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SubscriptionScreen;
