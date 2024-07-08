import { getUserId, getAccessToken } from "@/app/lib/actions"; // Import necessary functions to get user ID and access token
import React from 'react'; // Import React
import apiService from "@/app/services/apiService"; // Import the API service for making API calls
import ConversationDetail from "@/app/components/inbox/ConversationDetail"; // Import the ConversationDetail component
import { UserType } from "@/app/inbox/page"; // Import the UserType type definition

// Define the MessageType type
export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
};

// Define the ConversationPage component
const ConversationPage = async ({ params }: { params: { id: string } }) => {
    // Get the user ID and access token
    const userId = await getUserId();
    const token = await getAccessToken();

    // If user is not authenticated, show a message
    if (!userId || !token) {
        return (
            <main className="max-w-[1400px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        );
    }

    // Fetch the conversation details from the API
    const conversation = await apiService.get(`/api/chat/${params.id}/`);

    // Render the ConversationDetail component with the fetched data
    return (
        <main className="max-w-[1000px] mx-auto px-6 pb-6">
            <ConversationDetail 
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    );
};

export default ConversationPage; // Export the ConversationPage component
