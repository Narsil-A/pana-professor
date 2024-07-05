'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useAddClassModal from "@/app/hooks/useAddClassModal";

interface AddClassButtonProps {
    userId?: string | null;
}

const AddClassButton: React.FC<AddClassButtonProps> = ({
    userId
}) => {
    const loginModal = useLoginModal();
    const addClassModal = useAddClassModal();

    const openAddClassModal = () => {
        if (userId) {
            addClassModal.open()
        } else {
            loginModal.open();
        }
    }

    return (
        <div 
            onClick={openAddClassModal}
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            Add your class
        </div>
    )
}

export default AddClassButton;