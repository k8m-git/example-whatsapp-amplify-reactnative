import * as React from 'react';
import { FlatList, ImageBackground } from "react-native";
import { useEffect, useState } from 'react';

import { useRoute } from "@react-navigation/native";
import { 
    API,
    graphqlOperation,
    Auth
} from "aws-amplify";
 
import { messagesByChatRoom } from "../src/graphql/queries";

import ChatMessage from '../components/ChatMessage';
import InputBox from '../components/InputBox';
import BG from "../assets/images/BG.png";

const ChatRoomScreen = () => {

    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState([]);

    const route = useRoute();

    useEffect(() => {
        const fetchMessage = async() => {
            const messageData = await API.graphql(
                graphqlOperation(
                    messagesByChatRoom, {
                        chatRoomID: route.params.id,
                        sortDirection: "DESC",
                    }
                )
            )

            setMessages(messageData.data.messagesByChatRoom.items);
        }
        fetchMessage();
    }, [])

    useEffect(() => {
        const getMyId = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub)
        }
        getMyId();
    }, [])

    return (
        <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
                inverted
            />

            <InputBox chatRoomID={route.params.id} />
        </ImageBackground>
    )
};

export default ChatRoomScreen;