import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Ball from '../../components/ball';
import {calcLotteryMoney, isLotteryBingo} from '../../utils';

// http://47.98.118.82:5000/get_num_by_period?period=21048
export default function PlanList({navigation}) {
  const [isRefashing, setIsRefashing] = useState(false);
  useEffect(() => {
    setIsRefashing(true);
    getMyNum();
    listener = DeviceEventEmitter.addListener('testName', () => {
      getMyNum();
    });
    return () => {
      listener.remove();
    };
  }, [navigation]);
  const [myNum, setMyNum] = useState({});
  let listener = null;
  const getMyNum = () => {
    const url =
      'http://47.98.118.82:5000/my_num?userID=6095d31ed62bd25a4b516e2b';
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMyNum(data);
        setIsRefashing(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const Item = ({ballListNum, lotteryDrawResult}) => {
    return (
      <View style={styles.item}>
        {ballListNum
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
                  isLotteryBingo(i, lotteryDrawResult, 'red')
                    ? '#aaaaaa'
                    : 'red'
                }
              />
            );
          })}
        {ballListNum
          .split(' ')
          .slice(5, 7)
          .map(i => {
            return (
              <Ball
                key={i}
                num={i}
                type={'red'}
                size={30}
                color={
                  isLotteryBingo(i, lotteryDrawResult, 'blue')
                    ? '#aaaaaa'
                    : 'blue'
                }
              />
            );
          })}
        <View style={{flex: 1}} />
        <Text
          style={[
            styles.money1,
            calcLotteryMoney(ballListNum, lotteryDrawResult).level ===
              '未中奖' && styles.money,
            calcLotteryMoney(ballListNum, lotteryDrawResult).level ===
              '未开奖' && styles.money2,
          ]}>
          {calcLotteryMoney(ballListNum, lotteryDrawResult).level}
          {/* {!calcLotteryMoney(ballListNum, lotteryDrawResult).money
            ? ''
            : '¥' + calcLotteryMoney(ballListNum, lotteryDrawResult).money} */}
        </Text>
      </View>
    );
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.myNumWrapper}>
        <Text style={styles.title}>
          {item.drawNum} -
          {item.lotteryDrawResult.length
            ? `  已于${item.lotteryDrawTime}开奖`
            : '  等待开奖'}
        </Text>
        {!!item.lotteryDrawResult.length && (
          <Text style={{padding: 10, paddingBottom: 0, color: 'red'}}>
            开奖号码 {item.lotteryDrawResult}
          </Text>
        )}
        {item.mycode.map(ix => {
          return (
            <View style={styles.ballContainer} key={ix}>
              <Item
                ballListNum={ix}
                lotteryDrawResult={item.lotteryDrawResult[0]}
              />
            </View>
          );
        })}
      </View>
    );
  };
  const handleRefresh = () => {
    setIsRefashing(true);
    getMyNum();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={myNum}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.empyBox}>
            <Text style={styles.empty}>暂无方案</Text>
          </View>
        }
        keyExtractor={i => i._id.$oid}
        refreshControl={
          <RefreshControl
            refreshing={isRefashing}
            onRefresh={() => handleRefresh()}
            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
            progressBackgroundColor="#ffffff"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    paddingBottom: 50,
  },
  myNumWrapper: {
    display: 'flex',
    padding: 5,
    margin: 5,
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
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#333333',
    borderRadius: 5,
    padding: 5,
    textAlignVertical: 'center',
  },
  money1: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    opacity: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    textAlignVertical: 'center',
  },
  money2: {
    color: '#aaaaaa',
    fontWeight: 'bold',
    fontSize: 15,
    opacity: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaaaaa',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    textAlignVertical: 'center',
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
  item: {
    display: 'flex',
    flexDirection: 'row',
  },
  empty: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  empyBox: {
    display: 'flex',
    minHeight: Dimensions.get('window').height,
    justifyContent: 'center',
  },
});
