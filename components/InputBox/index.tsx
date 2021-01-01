import * as React from 'react';
import { View } from 'react-native';
import styles from './styles';

import { 
    API,
    graphqlOperation,
    Auth
} from "aws-amplify";
 
import { createMessage } from "../../src/graphql/mutations";

import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
    Entypo,
    Fontisto,
} from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Value } from 'react-native-reanimated';

const InputBox = (props) => {

    const { chatRoomID } = props;

    const [message, setMessage] = useState('');
    const [myUserId, setMyUserId] = useState('');

    useEffect(() => {
        const fetchUser = async() => {
            const userInfo = await Auth.currentAuthenticatedUser();

            setMyUserId(userInfo.attributes.sub);
        }
        fetchUser();
    }, [])

    const onMicrophonePress = () => {
        console.log('Microphone')
    }

    const onSendPress = async() => {
        try {
            await API.graphql(
                graphqlOperation(
                    createMessage, {
                    input: {
                        content: message,
                        userID: myUserId,
                        chatRoomID: chatRoomID,
                    }
                }
                )
            );
        } catch (e) {
            console.log(e);
        }

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