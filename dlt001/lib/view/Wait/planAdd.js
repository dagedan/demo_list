import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import {Provider, List, Button, Toast} from '@ant-design/react-native';
import {MMKV} from 'react-native-mmkv';
import {useStore} from 'effector-react';
import Ball from '../../components/ball';
import {redBall, blueBall, createAllPeriod} from '../../utils';
import {$currentPeriod} from '../Draw/drawDataStore';

import {
  $selectedRedBall,
  $selectedBlueBall,
  changeSelectedRedBall,
  changeSelectedBlueBall,
  changeAllPeroid,
  clearSelectedRedBall,
  clearSelectedBlueBall,
} from './waitDataStore';

const PlanAdd = ({num, type, color = '#aaaaaa', route, navigation}) => {
  const [selectPeriod, setselectPeriod] = useState('请选择购买期数');
  const onPress = () => {
    navigation.navigate('selectPeriod');
  };
  const selectedRedBallList = useStore($selectedRedBall);
  const selectedBlueBallList = useStore($selectedBlueBall);
  const currentPeriod = useStore($currentPeriod);
  useEffect(() => {
    const {period} = route.params;
    if (period) {
      setselectPeriod(period);
    } else if (currentPeriod) {
      setselectPeriod(currentPeriod);
    }
    let allPeriod = createAllPeriod(currentPeriod);
    changeAllPeroid(allPeriod);
  }, []);
  const planAdd = () => {
    if (selectedRedBallList.size !== 5) {
      Toast.fail('前区只能选5个号码', 1, () => {}, false);
      return;
    }
    if (selectedBlueBallList.size !== 2) {
      Toast.fail('后区只能选2个号码');
      return;
    }
    if (selectPeriod === '请选择购买期数') {
      Toast.fail('请先选择购买期数');
      return;
    }
    const userInfo = JSON.parse(MMKV.getString('userInfo'));
    let tmpData = {
      mycode: selectedRedBallList
        .sort()
        .concat(selectedBlueBallList.sort())
        .join(' '),
      drawNum: selectPeriod + '',
      userID: userInfo._id.$oid,
    };
    fetch('http://47.98.118.82:5000/add_num', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tmpData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          Toast.success('添加成功');
          clearSelectedRedBall();
          clearSelectedBlueBall();
          navigation.navigate('wait');
        } else {
          Toast.fail('添加失败!');
        }
      })
      .catch(err => Toast.fail(err.toString()));
  };
  return (
    <ScrollView>
      <Provider>
        <List.Item
          style={styles.listItem}
          arrow="horizontal"
          onPress={() => onPress()}>
          {selectPeriod}
        </List.Item>
        <View style={styles.wrapper}>
          {redBall.map(i => (
            <TouchableWithoutFeedback
              onPress={() => changeSelectedRedBall(i)}
              key={i}>
              <View style={styles.ball}>
                <Ball
                  num={i}
                  size={30}
                  color={
                    selectedRedBallList.indexOf(i) > -1 ? 'red' : '#aaaaaa'
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <View style={styles.wrapper}>
          {blueBall.map(i => (
            <TouchableWithoutFeedback
              onPress={() => changeSelectedBlueBall(i)}
              key={i}>
              <View style={styles.ball}>
                <Ball
                  num={i}
                  size={30}
                  color={
                    selectedBlueBallList.indexOf(i) > -1 ? 'blue' : '#aaaaaa'
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <Button style={styles.btn} type="primary" onPress={() => planAdd()}>
          添加方案
        </Button>
      </Provider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    marginBottom: 0,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    padding: 20,
    borderBottomWidth: 0,
    borderStyle: 'solid',
    borderColor: '#aaaaaa',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    textAlign: 'center',
  },
  ball: {
    margin: 5,
    padding: 5,
  },
  btn: {
    margin: 10,
  },
});
export default PlanAdd;
