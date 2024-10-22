import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Switch, ScrollView } from 'react-native';
import styles from './style';
import CustomHeader from '../../../../shared/Component/CustomHeader';
import { goBack } from '../../../../shared/Utils/navigationRef';
import Button from '../../../../components/Button';
import { cancelSubscription, updateAutoRenewal } from './SubscriptionAPICall';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useLoader } from '../../../../config/LoaderContext';
import { useDispatch, useSelector } from 'react-redux';
import PaymentCard from "../../../../assets/Images/paymentCard.png";
import { fetchSubscriptionInfo } from '../../../../redux/Slices/SubscriptionInfo';
import { formatToDDMMMYYYY, formatToDDMMYY, formatToMMDD } from '../../../../shared/Utils/CommonUtils';
import ConfirmationModal from '../../../../components/ConfirmModal';

const CancelSubscriptionScreen: React.FC = (props: any) => {
    const { route } = props;
    const { params } = route;
    const dispatch = useDispatch<AppDispatch>();
    const { loading, setLoading } = useLoader();
    const [autoRenewal, setAutoRenewal] = useState(true);
    const [hasInteractedWithAutoRenewal, setHasInteractedWithAutoRenewal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const { subscription, loading: subscriptionLoading, error: subscriptionError } = useSelector(
        (state: RootState) => state.subscription,
    );
    const { profiles, profileLoading, profileError } = useSelector((state: RootState) => state.profile);

    const {
        billingInfo: { billing_cycle, end_date, name: planName, start_date },
        nextPaymentInfo: { next_payment_amount, next_payment_date },
        paymentInfo: {
            amount_paid,
            card: { brand, cardholder_name, exp_month, exp_year, last4 },
            currency,
        },
    } = subscription;

    const daysUntilNextPayment = Math.ceil((new Date(end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    const userName = profiles.length > 0 ? profiles[0] : { email: 'Fresslab88@gmail.com', name: 'Mikor Burton' };

    const handleCancelSubscription = async () => {
        setLoading(true);
        try {
            if (params) {
                await cancelSubscription(params);
                setModalVisible(true);
                dispatch(fetchSubscriptionInfo()).unwrap();
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        setModalVisible(false);
        goBack();
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        if (hasInteractedWithAutoRenewal) {
            updateAutoRenewal(autoRenewal);
        }
    }, [autoRenewal, hasInteractedWithAutoRenewal]);

    const handleAutoRenewalChange = (value: boolean) => {
        setAutoRenewal(value);
        setHasInteractedWithAutoRenewal(true);
    };

    return (
        <View style={[styles.container, { marginTop: 40 }]}>
            <CustomHeader onBackPress={goBack} title='Manage Subscription' />
            <ScrollView contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}>
                <ImageBackground
                    source={PaymentCard}
                    style={styles.cardBackground}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 15 }}
                >
                    <View style={styles.chipIconContainer}>
                        <View style={styles.chipIcon} />
                    </View>
                    <Text style={styles.cardNumber}>**** **** **** {last4}</Text>
                    <View style={styles.cardInfoContainer}>
                        <View>
                            <Text style={styles.cardLabel}>Card Holder Name</Text>
                            <Text style={styles.cardHolderName}>{userName.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardLabel}>Expiry Date</Text>
                            <Text style={styles.expiryDate}>{`${exp_month}/${exp_year}`}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.row}>
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>Started On</Text>
                        <Text style={styles.value}>{formatToDDMMMYYYY(start_date)}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>Billing Cycle</Text>
                        <Text style={styles.value}>{planName}</Text>
                    </View>
                </View>

                <View style={styles.autoRenewalContainer}>
                    <Text style={styles.autoRenewalLabel}>Auto Renewal</Text>
                    <Switch
                        value={autoRenewal}
                        onValueChange={handleAutoRenewalChange}
                        thumbColor={autoRenewal ? "#fff" : "#fff"}
                        trackColor={{ false: "#ccc", true: "#000" }}
                    />
                </View>

                <View style={styles.paymentContainer}>
                    <View>
                        <Text style={styles.paymentLabel}>Next Payment</Text>
                        <Text style={styles.dueText}>Due in {daysUntilNextPayment} days</Text>
                    </View>
                    <View>
                        <Text style={styles.paymentLabel}>${next_payment_amount}</Text>
                        <Text style={styles.perMonth}>/{planName}</Text>
                    </View>
                </View>
                <Button
                    title="Cancel Subscription"
                    onPress={handleCancelSubscription}
                    buttonStyle={styles.cancelButton}
                    textStyle={styles.cancelButtonText}
                    disabled={loading}
                    loading={loading}
                />
            </ScrollView>
            <ConfirmationModal
                visible={isModalVisible}
                message={`Your access to all premium features will end on ${formatToDDMMYY(end_date)}`}
                onConfirm={handleConfirm}
                onClose={handleCloseModal}
            />
        </View>
    );
};

export default CancelSubscriptionScreen;
