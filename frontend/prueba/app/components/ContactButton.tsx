'use client';

import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";

interface ContactButtonProps {
    userId: string | null;
    profesorId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    profesorId
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const startConversation = async () => {
        if (userId) {
            try {
                const conversation = await apiService.get(`/api/chat/start/${profesorId}/`);
                if (conversation.conversation_id) {
                    router.push(`/inbox/${conversation.conversation_id}`);
                }
            } catch (error) {
                console.error('Failed to start conversation:', error);
            }
        } else {
            loginModal.open();
        }
    }

    return (
        <div 
            onClick={startConversation}
            className="mt-6 py-4 px-6 cursor-pointer bg-excuela text-white rounded-xl hover:bg-excuela-dark transition"
        >
            Contact
        </div>
    );
}

export default ContactButton;