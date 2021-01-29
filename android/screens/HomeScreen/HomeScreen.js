import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';

export default function HomeScreen({navigation}) {
  const { user, logout } = useContext(AuthContext);
  const onChatPress = () => {
    navigation.navigate('Chat')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>WELCOME, {user.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => logout()}>
          <Text style={styles.buttonTitle}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onChatPress()}>
          <Text style={styles.buttonTitle}>Go to CHAT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f1'
    },
    text: {
      fontSize: 20,
      color: '#333333'
    },
    button: {
      backgroundColor: '#788eec',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      width: 100,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
    },
    buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
    },
  });