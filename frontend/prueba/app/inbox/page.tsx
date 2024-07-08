import { getUserId } from "../lib/actions"; 
import apiService from "../services/apiService"; 
import Conversation from "../components/inbox/Conversation"; 


export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
}

// Define the ConversationType type
export type ConversationType = {
    id: string;
    users: UserType[];
}

// Define the InboxPage component
const InboxPage = async () => {
    // Get the user ID
    const userId = await getUserId();

    // If user is not authenticated, show a message
    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        );
    }

    // Fetch the list of conversations from the API
    const conversations = await apiService.get('/api/chat/');

    // Render the list of conversations
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl">Inbox</h1>

            {conversations.map((conversation: ConversationType) => {
                return (
                    <Conversation 
                        userId={userId}
                        key={conversation.id}
                        conversation={conversation}
                    />
                );
            })}
        </main>
    );
}

export default InboxPage; 
