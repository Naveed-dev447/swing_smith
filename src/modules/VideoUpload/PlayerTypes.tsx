import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomHeader from '../../shared/Component/CustomHeader';
import { goBack } from '../../shared/Utils/navigationRef';
import globalStyles from '../Onboarding/styles';
import CustomButton from '../../shared/Component/CustomButton';
import SelectedTouchableButton from '../../components/SelectedTouchableButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

interface SkillLevelProps {
  navigation: any;
}

const schema = yup.object().shape({
  playerType: yup.string().required('Please select a contact level'),
});

const PlayerTypes: React.FC<SkillLevelProps> = (props: any) => {
  const { navigation } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { skillLevel } = useSelector((state: RootState) => state.onboarding);

  const [selectedPlayerType, setSelectedPlayerType] = useState<string | null>(null);

  const beginnerLevel = ['Solid', 'Poor'];
  const otherLevel = ['Toe', 'Heel', 'Fat', 'Thin', 'Center'];
  const levels = skillLevel === 'Beginner' ? beginnerLevel : otherLevel;

  const data = {
    contact: selectedPlayerType,
    ball_flight: "",
  };

  const onSubmit = () => {
    if (skillLevel === 'Beginner') {
      navigation.navigate('OnboardHome13', data);
    } else {
      navigation.navigate('ballFlightType', selectedPlayerType);
    }
  };

  const renderItem = ({ item, onChange }: { item: string, onChange: (value: string) => void }) => (
    <SelectedTouchableButton
      text={item}
      isSelected={selectedPlayerType === item}
      onPress={() => {
        setSelectedPlayerType(item);
        onChange(item);
      }}
    />
  );

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What is your current contact level?
        </Text>
        <Controller
          control={control}
          name="playerType"
          render={({ field: { onChange } }) => (
            <FlatList
              data={levels}
              renderItem={({ item }) => renderItem({ item, onChange })}
              keyExtractor={(item) => item}
              numColumns={2}
              contentContainerStyle={styles.levelContainer}
            />
          )}
        />
        {errors.playerType && (
          <Text style={styles.errorText}>{errors.playerType.message}</Text>
        )}
      </View>
      <View style={globalStyles.buttonContainer}>
        <CustomButton title="Next" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default PlayerTypes;

const styles = StyleSheet.create({
  levelContainer: {
    marginTop: hp('5%'),
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: wp('3%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
});
