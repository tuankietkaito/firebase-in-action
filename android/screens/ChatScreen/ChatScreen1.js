import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../navigation/AuthProvider';
import { GiftedChat } from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';

function ChatScreen() {
  const { user } = useContext(AuthContext);

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);

    const message = {
      id,
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  refOn = (callback) => {
    database()
      .ref('Messages')
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(parse(snapshot)));
  };

  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: database.ServerValue.TIMESTAMP,
      };
      database()
        .ref('Messages')
        .push(message);
    }
  };

  refOff = () => {
    database()
      .ref('Messages')
      .off();
  }

  const [mess,setMess] = useState([]);
  useEffect(() => {
    
    refOn((newMessage) => {
      setMess([...mess, newMessage])
    });

    return () => {
      refOff()
    }
  }, []);

  return (
      <GiftedChat
        messages={[]}
        onSend={send}
        user={user}
      />
  );
    
  }
  
export default ChatScreen;

// export default function ChatScreen() {
//   const { user, logout } = useContext(AuthContext);
// //   const onChatPress = () => {
// //     navigation.navigate('Chat')
// //   }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>WELCOME TO CHAT, {user.email}</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => logout()}>
//           <Text style={styles.buttonTitle}>Log Out</Text>
//       </TouchableOpacity>
//       {/* <TouchableOpacity
//         style={styles.button}
//         onPress={() => onChatPress()}>
//           <Text style={styles.buttonTitle}>Go to CHAT</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#f5f5f1'
//     },
//     text: {
//       fontSize: 20,
//       color: '#333333'
//     },
//     button: {
//       backgroundColor: '#788eec',
//       marginLeft: 30,
//       marginRight: 30,
//       marginTop: 20,
//       height: 48,
//       width: 100,
//       borderRadius: 5,
//       alignItems: "center",
//       justifyContent: 'center'
//     },
//     buttonTitle: {
//       color: 'white',
//       fontSize: 16,
//       fontWeight: "bold"
//     },
//   });