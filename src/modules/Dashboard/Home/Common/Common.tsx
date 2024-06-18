import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import globalStyles from '../styles';



export const Header: React.FC = () => (
    <View>
        <View style={globalStyles.headerContainer}>
            <Icon name="menu" style={globalStyles.headerIcon} />
            <Icon name="account-circle" style={globalStyles.headerIcon} />
        </View>
        <Text style={globalStyles.headerText}>Hello, Dilshan</Text>
        <Text style={globalStyles.subHeader}>Kandy, Sri Lanka</Text>
    </View>
);
export const Banner: React.FC = () => (
    <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644' }}
        style={{ width: '100%', height: hp('20%'), borderRadius: wp('2%'), marginTop: hp('2%') }}
        resizeMode="cover"
    >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={globalStyles.bannerText}>Golf is 90% inspiration, 10% perspiration</Text>
        </View>
    </ImageBackground>
);


export const RecentAnalysis: React.FC = () => (
    <View>
        <Text style={[globalStyles.sectionTitle, { marginTop: hp('2%') }]}>Recent Analysis</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: hp('2%') }}>
            <View style={[globalStyles.analysisCard, { marginRight: wp('2%') }]}>
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' }}
                    style={globalStyles.analysisCardImage}
                    imageStyle={{ borderRadius: wp('2%') }}
                >
                    <View style={globalStyles.analysisCardContent}>
                        <Text style={globalStyles.cardSubtitle}>Score: 7.2</Text>
                        <Text>Posture Score: 8.4</Text>
                        <Text>Swing Rhythm: 6.0</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={globalStyles.analysisCard}>
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914' }}
                    style={globalStyles.analysisCardImage}
                    imageStyle={{ borderRadius: wp('2%') }}
                >
                    <Text style={[globalStyles.cardSubtitle, { paddingLeft: wp('4%') }]}>Score: 6.2</Text>
                    <View style={globalStyles.analysisCardContent}>
                        <Text>Posture Score: 7.5</Text>
                        <Text>Swing Rhythm: 5.0</Text>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    </View>
);

export const AnalysisCard: React.FC<{ score: string; postureScore: string; swingRhythm: string; imageUri: string }> = ({ score, postureScore, swingRhythm, imageUri }) => (
    <View style={[styles.analysisCard, { marginRight: wp('2%') }]}>
        <ImageBackground source={{ uri: imageUri }} style={styles.analysisCardImage} imageStyle={{ borderRadius: wp('2%') }}>
            <View style={styles.overlay}>
                <Text style={styles.scoreText}>Score</Text>
                <Text style={styles.scoreValue}>{score}</Text>
                <View style={styles.scoreDetail}>
                    <Text style={styles.detailText}>Posture Score {postureScore}</Text>
                </View>
                <View style={styles.scoreDetail}>
                    <Text style={styles.detailText}>Swing Rhythm {swingRhythm}</Text>
                </View>
            </View>
        </ImageBackground>
    </View>
);
//TODO:  We will pass props a method to handle TouchableOpacity 

export const UploadSwing: React.FC = () => (
    <View style={globalStyles.uploadSwingContainer}>
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' }}
            style={globalStyles.uploadSwingImage}
            resizeMode="cover"
            imageStyle={{ borderRadius: wp('2%') }}
        >
            <Text style={globalStyles.bannerText}>Import Swing</Text>
            <Text style={globalStyles.swingDesText}>Record your Swing and receive analysis.</Text>
            <TouchableOpacity style={globalStyles.uploadButton}>
                <Text style={globalStyles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
        </ImageBackground>
    </View>
);

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => (
    <View style={globalStyles.recommendedSection}>
        <View style={globalStyles.recommendedHeader}>
            <Text style={globalStyles.recommendedTitle}>{title}</Text>
            <TouchableOpacity>
                <Text style={globalStyles.seeAll}>See All</Text>
            </TouchableOpacity>
        </View>
        {children}
    </View>
);

interface WorkoutCardProps {
    title: string;
    progress: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ title, progress }) => (
    <View style={[globalStyles.card, { width: wp('40%'), marginRight: wp('2%') }]}>
        <Icon name="dumbbell" size={wp('10%')} color="#000" />
        <Text>{progress}</Text>
        <Text>{title}</Text>
    </View>
);

interface DrillCardProps {
    title: string;
}

export const DrillCard: React.FC<DrillCardProps> = ({ title }) => (
    <View style={[globalStyles.card, { width: wp('40%'), marginRight: wp('2%') }]}>
        <Icon name="golf" size={30} color="#000" />
        <Text>{title}</Text>
        <TouchableOpacity style={globalStyles.markAsDoneButton}>
            <Text style={globalStyles.markAsDoneText}>Mark As Done</Text>
        </TouchableOpacity>
    </View>
);

interface TutorialCardProps {
    title: string;
    duration: string;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({ title, duration }) => (
    <View style={styles.card}>
        <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.image}
        />
        <Text>{title}</Text>
        <Text>{duration}</Text>
    </View>
);

interface ChallengeCardProps {
    title: string;
    icon: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, icon }) => (
    <View style={[globalStyles.card, { width: wp('30%'), marginRight: wp('2%') }]}>
        <Icon name={icon} size={wp('10%')} color="#000" />
        <Text>{title}</Text>
    </View>
);

export const HorizontalScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {children}
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    section: {
        marginVertical: hp('1%'),
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('2.5%'),
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
    },
    seeAll: {
        color: '#1E90FF',
    },
    card: {
        width: wp('40%'),
        marginHorizontal: wp('2.5%'),
        padding: wp('2.5%'),
        backgroundColor: '#f8f8f8',
        borderRadius: wp('2%'),
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: hp('12%'),
        borderRadius: wp('2%'),
    },
    button: {
        marginTop: hp('1%'),
        paddingVertical: hp('0.5%'),
        paddingHorizontal: wp('2.5%'),
        backgroundColor: '#1E90FF',
        borderRadius: wp('1%'),
    },
    buttonText: {
        color: '#fff',
    },
    analysisCard: {
        width: wp('80%'),
        height: hp('20%'),
        borderRadius: wp('2%'),
        overflow: 'hidden',
    },
    analysisCardImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: wp('3%'),
        borderRadius: wp('2%'),
    },
    scoreText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
    scoreValue: {
        color: '#fff',
        fontSize: wp('7%'),
        fontWeight: 'bold',
    },
    scoreDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('0.5%'),
    },
    detailText: {
        color: '#fff',
        fontSize: wp('3.5%'),
    },

});