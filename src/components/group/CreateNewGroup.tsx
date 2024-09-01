import { Input, Textarea } from "@headlessui/react";
import Modal from "../ui/Modal";
import { FC, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateGroup } from "../../api/request";
import toast from "react-hot-toast";

interface CreateNewGroupProps {
  isModalOpen: boolean;
  closeModal: () => void;
  refectchGroups: () => void;
}

const defaultFormInput = {
  name: "",
  description: ""
}

const CreateNewGroup: FC<CreateNewGroupProps> = ({ 
  isModalOpen, closeModal, refectchGroups 
}) => {
  const [formData, setFormData] = useState(defaultFormInput);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      toast.error(error)
    } else {
      toast.success(success)
    }
  }, [error, success])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      setError("Both name and desription are required.")
      return false;
    }
    setError(null)
    return true
  };

  const { mutateAsync: addGroupMutation, isPending } = useMutation({
    mutationFn: CreateGroup,
    onSuccess: () => {
      setSuccess("Group created successfuly");
      setFormData(defaultFormInput);
      closeModal();
    },
    onError: ((error: Error) => {
      setError(error.message)
    })
  })

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await addGroupMutation(formData);
    refectchGroups();
  }

  return (
    <>
      <Modal title="Create new group" isOpen={isModalOpen} onClose={closeModal}>
        <Input 
          className="text-input-gray mt-2" 
          placeholder="Name" 
          name="name" 
          value={formData.name}
          onChange={handleInputChange}
          autoComplete="off" 
        />
        <Textarea 
          className="textarea-gray mt-2"
          placeholder="Add note"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <button 
          type="button" 
          className="modal-button mt-2" 
          onClick={handleSubmit}
        >
          {isPending ? "Creating new group..." : "Create new group"}
        </button>
      </Modal>
    </>
  );
};

export default CreateNewGroup;
