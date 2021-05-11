import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  Button,
  WhiteSpace,
  InputItem,
  Provider,
  Toast,
} from '@ant-design/react-native';
import {MMKV} from 'react-native-mmkv';

const Login = ({navigation}) => {
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');
  useEffect(() => {
    const userInfo = JSON.parse(MMKV.getString('userInfo'));
    if (userInfo.usr) {
      navigation.replace('MainTabs');
    }
  }, []);
  const login = () => {
    fetch('http://47.98.118.82:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usr: usr.replace(/\s+/g, ''),
        pwd: pwd,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(typeof data.data, data.data);
        if (data.data) {
          MMKV.set('userInfo', JSON.stringify(data.data));
          navigation.replace('MainTabs');
          Toast.success('登陆成功');
        } else {
          Toast.fail('账号或密码错误!');
        }
      })
      .catch(err => Toast.fail(err));
  };
  return (
    <Provider>
      <View style={styles.wrapper}>
        <View style={styles.displayFlex}>
          <View style={styles.splitFlex} />
          <Image
            style={styles.img}
            resizeMode={'contain'}
            source={require('../../img/dlt.png')}
          />
          <View style={styles.splitFlex} />
        </View>
        <View style={styles.loginBroder}>
          <InputItem
            clear
            type="phone"
            value={usr}
            onChange={value => setUsr(value)}
            placeholder="手机号码"
          />
          <View style={{height: 10}} />
          <InputItem
            clear
            type="password"
            value={pwd}
            onChange={value => setPwd(value)}
            placeholder="密码"
          />
          <Button type="primary" style={styles.btn} onPress={() => login()}>
            登陆
          </Button>
          <WhiteSpace />
        </View>
        <View style={styles.splitFlex} />
        <View style={styles.splitFlex} />
        <View style={styles.splitFlex} />
        <Text style={styles.bottomTxt}>尊重科学 · 理性购彩</Text>
        <Text style={styles.bottomTxt}>仅供我个人使用和大乐透爱好者交流学习</Text>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  loginBroder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aaaaaa',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  btn: {
    padding: 10,
    marginTop: 20,
  },
  splitFlex: {
    flex: 1,
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 80,
    marginBottom: 50,
  },
  bottomTxt: {
    textAlign: 'center',
    color: '#aaaaaa',
    margin: 10,
  },
  img: {
    width: 115,
    height: 146,
    margin: 'auto',
    alignItems: 'center',
  },
});
export default Login;
