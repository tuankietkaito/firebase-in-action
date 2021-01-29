import React from 'react';
import { View, Text, Image } from 'react-native';

export const ChatLineHolder = (props) => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft : 5,}}>
            <View>
                <Image 
                    source={{uri: props.photoUrl}}  
                    style={{
                        marginTop : 10, 
                        marginRight : 5, 
                        width: 50, 
                        height: 50, 
                        borderRadius: 25
                    }} 
                />
            </View>
            
            <View style={{
                flexDirection: 'column', 
                width: '70%', 
                alignItems: 'flex-start',
                paddingLeft: 15, 
                paddingBottom: 8,
                paddingRight: 12,
                paddingTop: 8,
                backgroundColor: '#FFF', 
                borderRadius: 20,
                marginBottom : 10,
                marginTop : 10,
                marginLeft : 5,
                marginRight : 5
            }} >
                <Text style={{ color: '#005ce6', fontWeight: "bold", marginBottom: 5 }} >{props.userName}</Text>
                <View>
                    { props.message != '' 
                        ? // Show message
                        <Text>{props.message}</Text> 
                        : // Show image
                        <Image 
                            source={{uri: props.image}}  
                            style={{
                                marginTop : 10, 
                                marginRight : 5, 
                                borderRadius: 10,
                                height: 100,
                                width: 200,
                                resizeMode: 'contain',
                                alignSelf: "flex-start"
                            }} 
                        /> 
                    }
                </View>
                
            </View>
        </View>
        
    );

};