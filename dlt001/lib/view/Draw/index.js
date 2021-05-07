import React, {useState, useEffect} from 'react';
import Ball from '../../components/ball';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as icon from '../../icon';

const Item = ({item, onPress, style}) => {
  const red = item.lotteryDrawResult.split(' ').slice(0, 5);
  const blue = item.lotteryDrawResult.split(' ').slice(5, 7);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={styles.top}>
        <Text>{item.lotteryDrawNum}期</Text>
        <View style={{flex: 1}}></View>
        <Text>{item.lotteryDrawTime}</Text>
      </View>
      <View style={styles.ballContainer}>
        <View style={styles.tag}>{icon.no('black')}</View>
        {red.map(i => {
          return <Ball key={i} num={i} type={'red'} />;
        })}
        <View style={{flex: 1}}></View>
        {blue.map(i => {
          return <Ball key={i} num={i} />;
        })}
        <View style={{flex: 1}}></View>
      </View>
      <View style={styles.bottom}>
        <Text>顺序:{item.lotteryUnsortDrawresult}</Text>
        {/* <Text style={styles.jine}>¥5</Text> */}
        <Text style={styles.weimai}>¥0</Text>
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  App.options = {
    statusBar: false,
  };
  const [selectedId, setSelectedId] = useState(null);
  const [Data, setData] = useState([]);
  const [total, settotal] = useState(0);
  const [pageNo, setpageNo] = useState(1);
  const [totalPage, settotalPage] = useState(0);
  useEffect(() => {
    getData('start');
  }, []);
  const getData = type => {
    if (pageNo >= totalPage && type === 'more') {
      return;
    }
    const url = `http://47.98.118.82:5000/get_history_data_by_page?pageNo=${pageNo}&pageSize=16`;
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData([...Data, ...data.data]);
        settotal(data.total);
        settotalPage(data.totalPage);
        setpageNo(data.pageNo + 1);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const renderItem = ({item}) => {
    const backgroundColor = item._id.$oid === selectedId ? '#FDFDFD' : 'white';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item._id.$oid)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={i => i._id.$oid}
        extraData={selectedId}
        onEndReached={() => getData('more')}
        onEndReachedThreshold={0.1}
        getItemLayout={(data, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    height: 120,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f1f1f1',
    paddingTop: 0,
  },
  top: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  bottom: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  ballContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tag: {
    position: 'absolute',
    zIndex: 1,
    right: -10,
    top: -30,
  },
  jine: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'red',
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.7,
  },
  weimai: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#333333',
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
});

export default App;
// userID: 609234d5b8578f04b0cea103