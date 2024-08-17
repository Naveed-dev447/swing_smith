import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CustomHeader from '../../shared/Component/CustomHeader';
import CustomButton from '../../shared/Component/CustomButton';
import globalStyles from '../../modules/Onboarding/styles';
import { goBack } from '../../shared/Utils/navigationRef';
import SelectedTouchableButton from '../../components/SelectedTouchableButton';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { setClubType } from '../../redux/Slices/OnboardingSlice';

const schema = yup.object().shape({
  club: yup.string().required('Please select a club type'),
});

const ClubType: React.FC = ({ route, navigation }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [dispatchSuccessful, setDispatchSuccessful] = useState(false);

  const clubOptions = ['Driver', 'Woods', 'Irons', 'Wedges', 'Putter'];

  const onSubmit = (data: { club: string }) => {    
    dispatch(setClubType(data.club));
    setDispatchSuccessful(true);
  };

  useEffect(() => {
    if (dispatchSuccessful) {
      navigation.navigate('OnboardHome9');
    }
  }, [dispatchSuccessful, navigation]);

  const renderClubOption = ({ item, onChange }: { item: string, onChange: (value: string) => void }) => (
    <SelectedTouchableButton
      text={item}
      isSelected={selectedClub === item}
      onPress={() => {
        setSelectedClub(item);
        onChange(item);
      }}
    />
  );

  return (
    <View style={globalStyles.container}>
      <CustomHeader onBackPress={goBack} />
      <View style={globalStyles.contentContainer}>
        <Text style={globalStyles.title}>
          What club are you using for this shot?
        </Text>
        <Text style={globalStyles.subTitle}>
          Analyzing video recorded diagonally or from the back may result in
          lower accuracy
        </Text>
        <Controller
          control={control}
          name="club"
          render={({ field: { onChange } }) => (
            <FlatList
              data={clubOptions}
              renderItem={({ item }) => renderClubOption({ item, onChange })}
              keyExtractor={(item) => item}
              numColumns={2}
              contentContainerStyle={styles.clubContainer}
            />
          )}
        />
       {errors.club && <Text style={globalStyles.errorText}>{errors.club.message}</Text>}
        </View>
        <View style={globalStyles.buttonContainer}>
          <CustomButton
            title="Next"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
    </View>
  );
};

export default ClubType;

const styles = StyleSheet.create({
  clubContainer: {
    marginTop: hp('5%'),
    alignItems:'center'
  },
});
