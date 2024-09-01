import { Input, Textarea } from "@headlessui/react"
import InputWithList from "../ui/InputList"
import Modal from "../ui/Modal"
import { FC, useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateList, GetGroups } from "../../api/request";
import { GroupInterface } from "../../api/interface";
import toast from "react-hot-toast";

interface CreateNewListProps {
  isModalOpen: boolean;
  closeModal: () => void;
  setGroupsRefetch: (refetch: () => void) => void
  refetchLists: () => void
}

interface FormInput {
  name: string;
  description: string;
  selectedGroup: GroupInterface | null;
}
const defaultFormInput: FormInput = {
  name: "",
  description: "",
  selectedGroup: null,
}

const CreateNewList: FC<CreateNewListProps> = ({ 
  isModalOpen, closeModal, setGroupsRefetch, refetchLists 
}) => {
  const [data, setData] = useState<GroupInterface[]>([]);
  const [formData, setFormData] = useState(defaultFormInput);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {data: getGroups, isSuccess, refetch} = useQuery({
    queryKey: ['getGroups'],
    queryFn: GetGroups
  });

  useEffect(() => {
    if (error) {
      toast.error(error)
    } else {
      toast.success(success)
    }
  }, [error, success])

  useEffect(() => {
    if (isSuccess && getGroups?.data?.length) {
      setData(getGroups.data)
    }
  }, [getGroups, isSuccess]);

  useEffect(() => {
    setGroupsRefetch(refetch)
  }, [refetch, setGroupsRefetch]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value
    });
  }

  const handleGroupChange = (group: GroupInterface | null) => {
    setFormData({ ...formData, selectedGroup: group })
  }

  const validateForm = () => {
    if (
      !formData.name.trim() || 
      !formData.description.trim() || 
      !formData.selectedGroup
    ) {
      setError("All fields are required")
      return false;
    }
    setError(null);
    return true;
  }

  const { mutateAsync: addListMutation, isPending} = useMutation({
    mutationFn: CreateList,
    onSuccess: () => {
      setSuccess("List created successfully");
      setFormData(defaultFormInput);
      closeModal();
    },
    onError: ((error: Error) => {
      setError(error.message)
    })
  })

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await addListMutation({
      ...formData,
      groupId: formData.selectedGroup!.id
    })
    refetchLists()
  }

  return (
    <>
       <Modal title="Create new list" isOpen={isModalOpen} onClose={closeModal}>
       <Input 
          className="text-input-gray"
          name="name"
          placeholder="Name" 
          value={formData.name}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <InputWithList
          placeholder={"Select Group"} 
          data={data || []}
          selectedItem={formData.selectedGroup}
          setSelectedItem={handleGroupChange}
        />
        <Textarea 
          className="textarea-gray mt-2" 
          placeholder="Add note"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        ></Textarea>
        <button
          type="button"
          className="modal-button mt-2"
          onClick={handleSubmit}
        >
          {isPending ? "Creating new list..." : "Create new list"}
        </button>
      </Modal>
    </>
  )
}

export default CreateNewList
