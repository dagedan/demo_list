import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Provider, List, Button, Toast} from '@ant-design/react-native';
import {MMKV} from 'react-native-mmkv';
import Ball from '../../components/ball';
const PlanAdd = ({num, type, color = '#aaaaaa', route, navigation}) => {
  const [redBallSelect, setRedBallSelect] = useState([]);
  const [blueBallSelect, setBlueBallSelect] = useState([]);
  const [selectPeriod, setselectPeriod] = useState('请选择购买期数');
  const [redBall, setRedBall] = useState([])
  const [blueBall, setBlueBall] = useState([])
  const onPress = () => {
    navigation.navigate('selectPeriod');
  };
 
  useEffect(()=>{
    let redBallTmp = [];
    let blueBallTmp = [];
    for (let i = 1; i <= 33; i++) {
      i < 10 ? redBallTmp.push('0' + i) : redBallTmp.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      i < 10 ? blueBallTmp.push('0' + i) : blueBallTmp.push(i);
    }
    setRedBall(redBallTmp)
    setBlueBall(blueBallTmp)
    const { period } = route.params;
    if (period) {
      setselectPeriod(period)
    }
  }, [])
  const onRedBallPress = val => {
    let tmp = [...redBallSelect]
    if (tmp.indexOf(val) > -1) {
      tmp.splice(tmp.indexOf(val), 1)
    } else {
      if (tmp.length === 5) {
        Toast.fail('单注只能选择5个号码');
        return
      }
      tmp.push(val)
    }
    setRedBallSelect(tmp)
  }
  const onBlueBallPress = val => {
    let tmp = [...blueBallSelect]
    if (tmp.indexOf(val) > -1) {
      tmp.splice(tmp.indexOf(val), 1)
    } else {
      if (tmp.length === 2) {
        Toast.fail('单注只能选择2个号码');
        return
      }
      tmp.push(val)
    }
    setBlueBallSelect(tmp)
  }
  const planAdd = () => {
    if (redBallSelect.length !== 5) {
      Toast.fail('前区只能选5个号码');
      return
    }
    if (blueBallSelect.length !== 2) {
      Toast.fail('后区只能选2个号码');
      return
    }
    if(parseInt(selectPeriod) === 0) {
      Toast.fail('请先选择期数');
      return
    }
    // data = {
    //   'code': code,
    //   'drawNum': drawNum,
    //   'userID': '6095d31ed62bd25a4b516e2b'
    // }
    const userInfo = JSON.parse(MMKV.getString('userInfo'));
    let tmpData = {
      mycode: [redBallSelect.sort().concat(blueBallSelect.sort()).join(' ')],
      drawNum: parseInt(selectPeriod),
      userID: userInfo._id.$oid,
      currentCode: ''
    }
    console.log(tmpData)
    fetch('http://47.98.118.82:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tmpData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(typeof data.data, data.data);
        if (data.data) {
          MMKV.set('userInfo', JSON.stringify(data.data));
          navigation.replace('MainTabs');
          Toast.success('登陆成功');
        } else {
          Toast.fail('添加失败!');
        }
      })
      .catch(err => Toast.fail(err));
  }
  return (
    <Provider>
      <List.Item arrow="horizontal" onPress={() => onPress()}>
        {selectPeriod}
      </List.Item>
      <View style={styles.wrapper}>
        {redBall.map(i => (
          <TouchableOpacity onPress={() => onRedBallPress(i)} key={i}>
            <View style={styles.ball}>
              <Ball
                num={i}
                size={30}
                color={redBallSelect.indexOf(i) > -1 ? 'red' : '#aaaaaa'}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.wrapper} >
        {blueBall.map(i => (
          <TouchableOpacity onPress={() => onBlueBallPress(i)} key={i}>
            <View style={styles.ball}>
              <Ball
                num={i}
                size={30}
                color={blueBallSelect.indexOf(i) > -1 ? 'blue' : '#aaaaaa'}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Button style={styles.btn} type="primary" onPress={() => planAdd()}>
        添加方案
      </Button>
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0,
    borderStyle: 'solid',
    borderColor: '#aaaaaa',
    backgroundColor: 'white',
  },
  ball: {
    margin: 5,
    padding: 5,
  },
  btn: {
    margin: 10,
  }
});
export default PlanAdd;
