'use client';

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";

interface ConversationProps {
    conversation: ConversationType; // Props: The conversation object
    userId: string; // Props: The ID of the current user
}

const Conversation: React.FC<ConversationProps> = ({
    conversation,
    userId
}) => {
    const router = useRouter(); // Initialize the router for navigation

    // Find the other user in the conversation 
    const otherUser = conversation.users.find((user) => user.id !== userId);

    return (
        <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
            {/* Display the name of the other user */}
            <p className="mb-6 text-xl">{otherUser?.name}</p>

            {/* Clickable element to navigate to the conversation details */}
            <p 
                onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-excuela-dark"
            >
                Go to conversation
            </p>
        </div>
    );
};

export default Conversation;
