import React from 'react';
import {Button} from '@ant-design/react-native';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useStore} from 'effector-react';
import {allPeriod} from './waitDataStore';

export default function SelectPeriod({navigation}) {
  const periods = useStore(allPeriod);
  const onPress = val => {
    navigation.replace('planAdd', {period: val});
  };
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {periods.map(i => {
          return (
            <Button key={i} style={styles.btnItem} onPress={() => onPress(i)}>
              {i}
            </Button>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    padding: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    backgroundColor: 'white',
    paddingBottom: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnItem: {
    alignItems: 'center',
    margin: 5,
  },
});
