import React, {useEffect, useState} from 'react';
import {Button, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {StyleSheet, View, Text, FlatList, SafeAreaView} from 'react-native';
import _ from 'lodash';
// _.difference()
// http://47.98.118.82:5000/get_num_by_period?period=21048
export default function Wait() {
  useEffect(() => {
    getMyNum();
  }, []);
  const [myNum, setMyNum] = useState({});
  const getMyNum = () => {
    const url =
      'http://47.98.118.82:5000/my_num?userID=609234d5b8578f04b0cea103';
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMyNum(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.myNumWrapper}>
        <Text>{item.drawNum}</Text>
      </View>
    );
  };
  const onPressLearnMore = () => {
    console.log('====================================');
    console.log(123);
    console.log('====================================');
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={myNum}
        renderItem={renderItem}
        keyExtractor={i => i._id.$oid}
      />
      <WhiteSpace />
      <Button type="primary" style={styles.btn} onPress={onPressLearnMore}>
        新增方案
      </Button>
      <WhiteSpace />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  myNumWrapper: {
    display: 'flex',
    padding: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f1f1f1',
  },
  btn: {
    padding: 10,
    margin: 100,
  },
});
