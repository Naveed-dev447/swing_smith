import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../../shared/Component/CustomHeader';
import { goBack } from '../../../shared/Utils/navigationRef';
import LottieView from 'lottie-react-native';
import { GetWorkoutDrillAPICall, UpdateWorkoutDrillAPICall } from './APICalls/WorkoutAPI';
import { ShowToast } from '../../../components/ShowToast';
import Button from '../../../components/Button';
import ProgressLoader from '../../../components/ProgressLoader';
import { useLoader } from '../../../config/LoaderContext';
import { IWorkoutDrill } from 'types/Workout';
import debounce from 'lodash/debounce';
import VideoModal from '../../../components/VideoModal';
import TutorialCard from '../../../shared/Component/TutorialCard/TutorialCard';

const checkIconSelected = require('../../../assets/Images/selectedCheckIcon.png');

const WorkoutDrillView = (props: any) => {
    const { route } = props;
    console.log("Params =======?", route.params);

    const { id, type, description, title, file_name, status } = route.params;

    const [workouts, setWorkouts] = useState<IWorkoutDrill[] | null>(null);
    const { loading, setLoading } = useLoader();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<{
        uri: string;
        title: string;
    } | null>(null);
    const isCompleted = status === 1 ? true : false;
    const buttonTitle = isCompleted ? "Completed" : "Mark as Done";
    const buttonIcon = isCompleted ? checkIconSelected : null;
    const buttonStyles = [
        styles.markAsDoneButton,
        isCompleted && styles.completedButton,
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await GetWorkoutDrillAPICall(id);

            if (response.status === 200) {
                setWorkouts(response.data);
                setLoading(false);
            } else {
                ShowToast('error', response.message);
                setLoading(false);
                console.error(response.message);
            }
        };
        // fetchData();
        return () => {
            setWorkouts(null);
        };
    }, [id]);

    if (loading) {
        return <ProgressLoader />;
    }

    const handleMarkAsDone = async () => {
        const payload = {
            id: id,
            status: 1
        };
        const response = await UpdateWorkoutDrillAPICall(payload);
        if (response.status === 200 && response.message !== 'Unable to update workout.') {
            ShowToast('success', `${response.message}`);
            goBack();
        } else {
            ShowToast('error', response.message);
            console.error(response.message);
        }
    };

    const debouncedHandleMarkAsDone = debounce(handleMarkAsDone, 300);


    const handleVideoPress = (uri: string, title: string) => {
        setSelectedVideo({ uri, title });
        setModalVisible(true);

    };

    return (
        <View style={styles.container}>
            <CustomHeader onBackPress={goBack} title={title || type} />

            <ScrollView contentContainerStyle={styles.contentContainer}
                scrollIndicatorInsets={{ right: 1 }}>
                <View style={styles.imageView}>
                    <LottieView
                        style={styles.image}
                        source={require('../../../assets/animations/Plank.json')}
                        autoPlay
                        loop
                    />
                </View>
                {/* <Text style={styles.workoutTitle}>
                    {'Drills Detail'}
                </Text> */}
                <Text style={styles.detail}>
                    {description}
                </Text>
                <TutorialCard
                    data={route.params}
                    onPress={() => handleVideoPress(file_name, description, modalVisible)}
                    navigateTo={null} />
                {status !== undefined &&
                    <View style={styles.buttonContainer}>
                        <Button
                            title={buttonTitle}
                            onPress={isCompleted ? null : debouncedHandleMarkAsDone}
                            buttonStyle={buttonStyles}
                            textStyle={styles.buttonText}
                            icon={buttonIcon}
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
    imageView: {
        width: wp('90%'),
        height: wp('50%'),
        backgroundColor: '#F6FFE7',
        marginBottom: hp('2%'),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    workoutTitle: {
        fontSize: wp('5%'),
        fontFamily: 'Outfit-Bold',
        marginBottom: hp('2%'),
        color: '#192126',
    },
    detail: {
        fontSize: wp('4%'),
        fontFamily: 'Outfit-Regular',
        marginBottom: hp('4%'),
        color: '#192126CC',
    },
    workoutsContainer: {
        width: '100%',
        marginBottom: hp('4%'),
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: hp('15%')
    },
    markAsDoneButton: {
        backgroundColor: '#c5f048',
        borderRadius: 25,
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('31%'),
    },
    buttonText: {
        color: '#192126',
        fontFamily: 'Outfit-SemiBold',
        fontSize: wp('4.2%'),
    },
    completedButton: {
        flexDirection: 'row',
        borderColor: '#c5f048',
        borderWidth: 2,
    },
});

export default WorkoutDrillView;
