import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Button} from '@ant-design/react-native';
import {calcLotteryMoney} from '../../utils';
export default function Me({navigation}) {
  const [myData, setMyData] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMyNum();
  }, []);
  useEffect(() => {
    setRefreshing(true);
    getMyNum();
  }, []);
  const getMyNum = () => {
    const url =
      'http://47.98.118.82:5000/my_num?userID=6095d31ed62bd25a4b516e2b';
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setRefreshing(false);
        const prize = data.reduce((t, b) => {
          // t = calcLotteryMoney(t.mycode[0], t.lotteryDrawResult[0]).money;
          return (
            t +
            parseInt(
              b.mycode.reduce((x, y) => {
                console.log('x:', x);
                return (
                  x +
                  parseInt(
                    isNaN(calcLotteryMoney(y, b.lotteryDrawResult[0]).money)
                      ? 0
                      : calcLotteryMoney(y, b.lotteryDrawResult[0]).money,
                    10,
                  )
                );
              }, 0),
              10,
            )
          );
        }, 0);
        setMyData({
          prize: prize,
          fund: data.reduce((a, b) => {
            return a + parseInt(b.mycode.length * 3, 10);
          }, 0),
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.label}>投资</Text>
          <Text style={styles.txt}>
            <Text style={styles.yang}>¥</Text>
            {myData.fund}
            <Text>.00</Text>
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>收益</Text>
          <Text style={styles.txt}>
            <Text style={styles.yang}>¥</Text>
            {myData.prize}
            <Text>.00</Text>
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>沉没成本</Text>
          <Text style={styles.txt1}>
            <Text style={styles.yang} />
            {myData.fund}
            <Text>.00</Text>
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>盈利</Text>
          <Text
            style={myData.prize - myData.fund > 0 ? styles.txt : styles.txt0}>
            <Text style={styles.yang} />
            {myData.prize - myData.fund > 0 ? myData.prize - myData.fund : 0}
            <Text>.00</Text>
          </Text>
        </View>
        <Button
          type="primary"
          style={styles.btn}
          onPress={() => navigation.navigate('planAdd')}>
          添加方案
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  scrollView: {
    paddingTop: 20,
  },
  label: {
    textAlign: 'center',
  },
  txt0: {
    color: '#aaaaaa',
    fontWeight: 'bold',
    fontSize: 60,
    opacity: 1,
    textAlign: 'center',
  },
  txt: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 60,
    opacity: 1,
    textAlign: 'center',
  },
  txt1: {
    color: '#1DA57A',
    fontWeight: 'bold',
    fontSize: 60,
    opacity: 1,
    textAlign: 'center',
  },
  yang: {
    fontSize: 20,
    color: '#333333',
  },
  item: {
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  btn: {
    margin: 10,
  },
});
