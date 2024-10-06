import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import PaymentCell from '../../../../components/PaymentCell';
import CustomHeader from '../../../../shared/Component/CustomHeader';
import { goBack } from '../../../../shared/Utils/navigationRef';
import Button from '../../../../components/Button';
import { cancelSubscription } from './SubscriptionAPICall';
import { RootState } from '../../../../redux/store';
import { ShowToast } from '../../../../components/ShowToast';
import { useLoader } from '../../../../config/LoaderContext';
import { useSelector } from 'react-redux';

const CancelSubscriptionScreen: React.FC = (props: any) => {
    const { route } = props;
    const { params } = route;
    const { loading, setLoading } = useLoader();
    const { subscriptions, loading: subscriptionLoading, error: subscriptionError } = useSelector(
        (state: RootState) => state.subscription,
    );
    console.log("Subscroptionsd v ,sngklsd", subscriptions);


    const handleCancelSubscription = async () => {
        setLoading(true)
        try {
            if (params) {
                await cancelSubscription(params);
                goBack();
            }
            setLoading(false);
        } catch (error) {
            setLoading(false)
        }

    }

    return (
        <View style={styles.container}>
            <CustomHeader onBackPress={goBack} title='Cancel Subscription' />
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg' }} style={styles.logo} />
                    <View>
                        <Text style={styles.planName}>SwingSmith</Text>
                        <Text style={styles.planDetails}>Monthly • Basic Plan</Text>
                        <Text style={styles.paymentDue}>
                            Payment due in <Text style={styles.paymentDueHighlight}>4 days</Text>
                        </Text>
                    </View>
                    <Text style={styles.price1}>$8.44</Text>
                </View>
            </View>
            <PaymentCell label="Next Payment due" value="12 Dec 2023" valueStyle={styles.missedPayment} />
            <PaymentCell label="Started on" value="12 Jan 2023" />
            <PaymentCell label="Total Amount Paid" value="$346.12" />
            <PaymentCell label="Payment Method" value="UPI" />

            <Button
                title="Cancel Subscription"
                onPress={handleCancelSubscription}
                buttonStyle={styles.cancelButton}
                textStyle={styles.cancelButtonText}
            />
        </View>
    );
};

export default CancelSubscriptionScreen;
