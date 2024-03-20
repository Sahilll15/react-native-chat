import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        setMessages([...messages, newMessage]);
        setNewMessage('');
    };

    return (

        <View>
            <Text className='  text-blue-400 text-center font-bold  '>Chat APP</Text>
        </View>

    );
};



export default ChatApp;