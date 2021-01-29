import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground,FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ChatLineHolder } from './chatLineHolder';
import { AuthContext } from '../../navigation/AuthProvider';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


// const getUser = () => {
//     const { user } = useContext(AuthContext);
//     return user.email;
// }

class ChatScreen extends React.Component {
    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            chatData: [],
            chatInputContent : '',
            username : ''
        }
    }

    async componentDidMount() {
        let name = 'Unknown Name';
        this.setState({username: name})
        database()
            .ref('messages')
            .on("value", snapshot => {
                if(snapshot.val() !== undefined && snapshot.val() !== null ) {
                    this.setState({
                        chatData: Object.values(snapshot.val())
                    });
                }
            });
    }

    _renderChatLine = (item) => {
        return(
            <ChatLineHolder 
                userName={item.userName} 
                image={item.imgUrl ? item.imgUrl : ''}
                message={item.message ? item.message : ''}
                photoUrl={(item.photoUrl != "/img/profile_placeholder.png") ? item.photoUrl : 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'} />
        );
    };

    render() {
        console.log("==> ", this.state);
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }} >
                <ImageBackground 
                    imageStyle={{ opacity: 0.4 }} source={require('./bg1.jpg')}
                    style={{ flex: 9 / 10, backgroundColor: '#A5A5A5', flexDirection: 'column', justifyContent: 'flex-end' }} 
                >
                    <FlatList 
                        data={this.state.chatData} 
                        renderItem={({item}) => this._renderChatLine(item)} 
                        keyExtractor={(item, index) => index + ""}
                    />
                </ImageBackground>
                <View style={{ flex: 1 / 10 }} >
                    <View style={{
                        flexDirection: 'row', 
                        backgroundColor: '#FFF',
                        width: '100%', 
                        height: '100%', 
                        justifyContent: 'space-around', 
                        alignItems: 'center', 
                        marginLeft: 2
                    }}  >
                        <View style={{flex : 6/10}} >
                        </View>
                        <View style={{flex : 4/10, alignItems: 'flex-end'}} >
                            <TouchableOpacity
                                style={{backgroundColor: `#8b0000`,
                                marginLeft: 30,
                                marginRight: 10,
                                marginTop: 20,
                                marginBottom: 20,
                                height: 48,
                                width: 100,
                                borderRadius: 5,
                                alignItems: "center",
                                justifyContent: 'center'}}
                                onPress={async () => {
                                            try { await auth().signOut(); } 
                                            catch (e) { console.error(e); }
                                        }} >
                                <Text style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
};
export default ChatScreen;