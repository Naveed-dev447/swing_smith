import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Image,
    Platform
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../../shared/Component/CustomHeader';
import { goBack } from '../../../shared/Utils/navigationRef';
import { UpdateWorkoutDrillAPICall, UpdateWorkoutListAPICall } from './APICalls/WorkoutAPI';
import { ShowToast } from '../../../components/ShowToast';
import Button from '../../../components/Button';
import { useLoader } from '../../../config/LoaderContext';
import { IWorkoutDrill } from 'types/Workout';
import debounce from 'lodash/debounce';
import VideoModal from '../../../components/VideoModal';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';
import CongratulationModal from '../../../components/CongratulationModal';

const checkIconSelected = require('../../../assets/Images/selectedCheckIcon.png');
const headerIcon = require('../../../assets/Images/vector.png');

const WorkoutDrillView = (props: any) => {
    const { route } = props;
    const { id, type, description, title, file_name, status, screen } = route.params;

    const { loading, setLoading } = useLoader();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<{
        uri: string;
        title: string;
    } | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const isCompleted = status === 1 ? true : false;
    const buttonTitle = isCompleted ? "Completed" : "Mark as Done";
    const buttonIcon = isCompleted ? checkIconSelected : null;
    const buttonStyles = [isCompleted ? styles.completedButton : styles.markAsDoneButton];

    const handleMarkAsDone = async () => {
        try {
            const payload = { id, status: 1 };
            setLoading(true)
            const updateFunction = screen === 'workout' ? UpdateWorkoutListAPICall : UpdateWorkoutDrillAPICall;
            const response = await updateFunction(payload);

            if (response.status === 200 && response.message !== 'Unable to update workout.') {
                setIsModalVisible(true);
            } else {
                handleError(response.message);
            }
        } catch (error: any) {
            handleError(error.message);
        } finally {
            setLoading(false)
        }
    };

    const handleError = (message: string) => {
        ShowToast('error', message);
    };

    const debouncedHandleMarkAsDone = debounce(handleMarkAsDone, 300);

    const handleVideoPress = (uri: string, title: string) => {
        setSelectedVideo({ uri, title });
        setModalVisible(true);
    };

    const handleConfirm = () => {
        setIsModalVisible(false);
        goBack();
    };

    if (isModalVisible) {
        return (
            <CongratulationModal
                title='Congratulations!'
                message={`Your task has been completed`}
                onConfirm={handleConfirm}
                onClose={() => setIsModalVisible(false)}
                buttonText='Thanks'
            />
        );
    }

    return (
        <View style={styles.container}>
            <CustomHeader onBackPress={goBack} title={title || type} />

            <ScrollView contentContainerStyle={styles.contentContainer}
                scrollIndicatorInsets={{ right: 1 }}>
                <TutorialCard
                    data={route.params}
                    onPress={() => handleVideoPress(file_name, description, modalVisible)}
                    navigateTo={null}
                />
                <View style={styles.shadowBox}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.header}>{screen === 'workout' ? 'Workout' : screen === 'drill' ? 'Drill' : 'Tutorial'} Instructions</Text>
                        <Image source={headerIcon} style={styles.headerImage} />
                    </View>
                    <Text style={styles.detail}>
                        {description}
                    </Text>
                </View>
                {status !== undefined &&
                    <View style={styles.buttonContainer}>
                        <Button
                            title={buttonTitle}
                            onPress={isCompleted ? null : debouncedHandleMarkAsDone}
                            buttonStyle={buttonStyles}
                            textStyle={styles.buttonText}
                            icon={buttonIcon}
                            disabled={loading}
                            loading={loading}
                        />
                    </View>
                }
            </ScrollView>
            {selectedVideo && (
                <VideoModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    videoUri={selectedVideo.uri}
                    title={selectedVideo.title}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: wp('5%'),
    },
    shadowBox: {
        width: wp('90%'),
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 20,
        borderRadius: 10,
        shadowColor: '#000',
        // For iOS
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        // For Android
        elevation: 2
    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        fontSize: wp('4.5%'),
        fontFamily: 'Outfit-Regular',
        fontWeight: '500',
        color: '#192126',
    },
    headerImage: {
        marginLeft: wp('2%'),
        width: Platform.OS === 'android' ? wp('6.2%') : wp('6.5%'),
        height: hp('3.2%'),
    },
    detail: {
        width: wp('80%'),
        marginTop: hp('1%'),
        fontSize: wp('4.2%'),
        fontFamily: 'Outfit-Regular',
        marginBottom: hp('4%'),
        color: '#192126',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: hp('15%'),
    },
    markAsDoneButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingVertical: hp('1.5%'),
        width: wp('90%'),
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
    },
    completedButton: {
        backgroundColor: '#BBF246',
        borderRadius: 25,
        paddingVertical: hp('1.5%'),
        width: wp('90%'), // Set a fixed width
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#c5f048',
        borderWidth: 2,
    },
    buttonText: {
        color: '#192126',
        fontFamily: 'Outfit-SemiBold',
        fontSize: wp('4.2%'),
    },

});

export default WorkoutDrillView;
