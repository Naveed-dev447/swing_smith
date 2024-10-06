import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Switch, ScrollView } from 'react-native';
import styles from './style';
import CustomHeader from '../../../../shared/Component/CustomHeader';
import { goBack } from '../../../../shared/Utils/navigationRef';
import Button from '../../../../components/Button';
import { cancelSubscription } from './SubscriptionAPICall';
import { ShowToast } from '../../../../components/ShowToast';
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
    const [autoRenewal, setAutoRenewal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const { subscriptions, loading: subscriptionLoading, error: subscriptionError } = useSelector(
        (state: RootState) => state.subscription,
    );
    const { profiles, profileLoading, profileError } = useSelector(
        (state: RootState) => state.profile,
    );

    const { status, plan, payment, current_period_start, current_period_end } = subscriptions;
    const userName = profiles.length > 0 ? profiles[0] : { email: 'Fresslab88@gmail.com', name: 'Mikor Burton' };

    const handleCancelSubscription = async () => {
        setLoading(true)
        try {
            if (params) {
                await cancelSubscription(params);
                setModalVisible(true);
                dispatch(fetchSubscriptionInfo()).unwrap();
            }
            setLoading(false);
        } catch (error) {
            setLoading(false)
        }

    }
    const handleConfirm = () => {
        setModalVisible(false);
        goBack();
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const daysUntilNextPayment = Math.ceil((current_period_end - Date.now() / 1000) / (60 * 60 * 24));

    return (
        <View style={styles.container}>
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
                    <Text style={styles.cardNumber}>**** **** **** 0329</Text>
                    <View style={styles.cardInfoContainer}>
                        <View>
                            <Text style={styles.cardLabel}>Card Holder Name</Text>
                            <Text style={styles.cardHolderName}>{userName.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardLabel}>Expiry Date</Text>
                            <Text style={styles.expiryDate}>{formatToMMDD(current_period_end)}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.row}>
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>Started On</Text>
                        <Text style={styles.value}>{formatToDDMMMYYYY(current_period_start)}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>Billing Cycle</Text>
                        <Text style={styles.value}>{plan.interval}</Text>
                    </View>
                </View>

                <View style={styles.autoRenewalContainer}>
                    <Text style={styles.autoRenewalLabel}>Auto Renewal</Text>
                    <Switch
                        value={autoRenewal}
                        onValueChange={setAutoRenewal}
                        thumbColor={autoRenewal ? "#fff" : "#fff"}
                        trackColor={{ false: "#ccc", true: "#000" }}
                    />
                </View>

                <View style={styles.paymentContainer}>
                    <View>
                        <Text style={styles.paymentLabel}>Next Payment</Text>
                        <Text style={styles.dueText}>{daysUntilNextPayment} days remaining</Text>
                    </View>
                    <View>
                        <Text style={styles.paymentLabel}>${payment.amount_paid}</Text>
                        <Text style={styles.perMonth}>/{plan.interval}</Text>
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
                message={`Your access to all premium features will end on ${formatToDDMMYY(current_period_start)}`}
                onConfirm={handleConfirm}
                onClose={handleCloseModal}  // Close when clicking the cross icon
            />
        </View>
    );
};

export default CancelSubscriptionScreen;
