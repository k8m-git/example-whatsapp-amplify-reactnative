import * as React from 'react';
import { View } from 'react-native';
import styles from './styles';

import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
    Entypo,
    Fontisto,
} from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Value } from 'react-native-reanimated';

const InputBox = () => {

    const [message, setMessage] = useState('');

    const onMicrophonePress = () => {
        console.log('Microphone')
    }

    const onSendPress = () => {
        console.log(`Send: ${message}`)

        // send the message to the backend

        setMessage('')
    }

    const onPress = () => {
        if (!message) {
            onMicrophonePress();
        } else {
            onSendPress();
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color="grey" />
                <TextInput
                    placeholder={'Type a message'}
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                />
                <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
                {!message && <Fontisto name="camera" size={24} color="grey" />}
            </View>
            <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
                {!message
                    ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
                    : <MaterialIcons name="send" size={28} color="white" />
                }
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;