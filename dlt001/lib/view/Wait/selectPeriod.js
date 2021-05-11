import React, {useEffect, useState} from 'react';
import {Button} from '@ant-design/react-native';
import {StyleSheet, View, ScrollView} from 'react-native';

export default function SelectPeriod({navigation}) {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    let data = []
    let date = new Date();
    const firstPeriod = parseInt(date.getFullYear().toString().substr(2, 2) + '001');
    for(let i = firstPeriod; i<firstPeriod+156; i++) {
      data.push(i)
    }
    setDataList(data)
  }, [])
  const onPress = val => {
    navigation.replace('planAdd', {'period': val});
  }
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {dataList.map(i => {
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
