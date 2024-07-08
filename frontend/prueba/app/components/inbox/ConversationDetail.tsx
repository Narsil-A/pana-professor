'use client';

import { useEffect, useState, useRef } from "react";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps {
    token: string;
    userId: string;
    conversation: ConversationType;
    messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    messages,
    conversation
}) => {
    const messagesDiv = useRef<HTMLDivElement>(null); // Reference to the messages container div
    const [newMessage, setNewMessage] = useState(''); // State to store the new message input
    const myUser = conversation.users?.find((user) => user.id == userId); // Find the current user in the conversation
    const otherUser = conversation.users?.find((user) => user.id != userId); // Find the other user in the conversation
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]); // State to store real-time messages

    // WebSocket setup
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
    });

    // Log connection state changes
    useEffect(() => {
        console.log("Connection state changed", readyState);
    }, [readyState]);

    // Handle incoming WebSocket messages
    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: '',
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id
            };
            setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }
        scrollToBottom();
    }, [lastJsonMessage]);

    // Function to send a new message via WebSocket
    const sendMessage = async () => {
        console.log('sendMessage');
        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        });
        setNewMessage('');
        setTimeout(() => {
            scrollToBottom();
        }, 50);
    };

    // Function to scroll to the bottom of the messages container
    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    };

    return (
        <>
            {/* Messages container */}
            <div 
                ref={messagesDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4"
            >
                {/* Render initial messages */}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-[80%] py-4 px-6 rounded-xl ${message.created_by.name == myUser?.name ? 'ml-[20%] bg-teal-200' : 'bg-gray-200'}`}
                    >
                        <p className="font-bold text-gray-500">{message.created_by.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}

                {/* Render real-time messages */}
                {realtimeMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-[80%] py-4 px-6 rounded-xl ${message.name == myUser?.name ? 'ml-[20%] bg-teal-200' : 'bg-gray-200'}`}
                    >
                        <p className="font-bold text-gray-500">{message.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>

            {/* New message input and send button */}
            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <CustomButton 
                    label='Send'
                    onClick={sendMessage}
                    className="w-[100px]"
                />
            </div>
        </>
    );
}

export default ConversationDetail;
