import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
const Model = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <TouchableHighlight
            style={{...styles.openButton, backgroundColor: '#2196F3'}}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  num: {
    fontFamily: 'System',
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 20,
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {lineHeight: 30},
      android: {},
    }),
  },
});
export default PlanAdd;
