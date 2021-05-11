import React, {useEffect, useState} from 'react';
import {Button} from '@ant-design/react-native';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Ball from '../../components/ball';
import {calcLotteryMoney} from '../../utils';

// http://47.98.118.82:5000/get_num_by_period?period=21048
export default function PlanList({navigation}) {
  useEffect(() => {
    getMyNum();
  }, []);
  const [myNum, setMyNum] = useState({});
  const getMyNum = () => {
    const url =
      'http://47.98.118.82:5000/my_num?userID=6095d31ed62bd25a4b516e2b';
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
        <Text style={styles.title}>{item.drawNum}</Text>
        {item.mycode.map(ix => {
          return (
            <View style={styles.ballContainer} key={ix}>
              {ix
                .split(' ')
                .slice(0, 5)
                .map(i => {
                  return (
                    <Ball
                      key={i}
                      num={i}
                      type={'red'}
                      size={30}
                      color={
                        calcLotteryMoney(ix, item.currentCode).level ===
                        '未中奖'
                          ? '#aaaaaa'
                          : 'red'
                      }
                    />
                  );
                })}
              {ix
                .split(' ')
                .slice(5, 7)
                .map(i => {
                  return (
                    <Ball
                      key={i}
                      num={i}
                      size={30}
                      color={
                        calcLotteryMoney(ix, item.currentCode).level ===
                        '未中奖'
                          ? '#aaaaaa'
                          : 'blue'
                      }
                    />
                  );
                })}
              <View style={{flex: 1}} />
              <Text
                style={
                  calcLotteryMoney(ix, item.currentCode).money == 0
                    ? styles.money
                    : styles.money1
                }>
                {calcLotteryMoney(ix, item.currentCode).money}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button
        type="primary"
        style={styles.btn}
        onPress={() => navigation.navigate('planAdd')}>
        添加方案
      </Button>
      <FlatList
        data={myNum}
        renderItem={renderItem}
        keyExtractor={i => i._id.$oid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
  },
  myNumWrapper: {
    display: 'flex',
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#aaaaaa',
  },
  btn: {
    position: 'absolute',
    right: 10,
    bottom: 60,
    zIndex: 1,
  },
  ballContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  level: {
    fontSize: 20,
    color: 'red',
  },
  money: {
    fontSize: 20,
    color: '#aaaaaa',
    fontWeight: 'bold',
  },
  money1: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
