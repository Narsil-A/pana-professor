'use client';

import { useState, FC } from 'react';
import EditClassModal from './modals/EditClassModal';

interface EditClassButtonProps {
  classId: string;
}

const EditClassButton: FC<EditClassButtonProps> = ({ classId }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openEditModal}
        className="px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
      >
        Edit Class
      </button>

      {isEditModalOpen && <EditClassModal params={{ id: classId }} isOpen={isEditModalOpen} onClose={closeEditModal} />}
    </div>
  );
};

export default EditClassButton;

