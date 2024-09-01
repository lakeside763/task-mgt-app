import { FC, useEffect, useState } from "react";
import { Input, Textarea } from "@headlessui/react";
import BottomModal from "../ui/BottomModal";
import { CalendarDaysIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import ModalButton from "../ui/ModalButton";
import InputWithList from "../ui/InputList";
import DropdownField from "../ui/DropdownField";
import { format } from "date-fns";
import TimeSelection from "../datetime/TimeSelection";
import DatePicker from "../datetime/DatePicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateTask, GetLists } from "../../api/request";
import { ListInterface } from "../../api/interface";
import toast from "react-hot-toast";

interface CreateNewTaskProps {
  showTaskModal: boolean;
  toggleTaskModal: () => void;
  refreshTasks: () => void;
  setListsRefetch: (refetch: () => void) => void;
}

const PriorityOptions = [
  { key: 'LOW', value: 'LOW' },
  { key: 'HIGH', value: 'HIGH' },
  { key: 'MEDIUM', value: 'MEDIUM' },
  { key: 'CRITICAL', value: 'CRITICAL' }
];

interface PriorityInterface {
  key: string | null;
  value: string | null;
}

interface TimesInterface {
  startTime: number | null; 
  endTime: number | null;
}

interface FormInput {
  name: string;
  description: string;
  listId: string
  priority: string
  date: string;
  startTime: number | any
  endTime: number | any
}

const defaultFormInput: FormInput = {
  name: "",
  description: "",
  listId: "",
  priority: "",
  date: "",
  startTime: null,
  endTime: null
};

const CreateNewTask: FC<CreateNewTaskProps> = ({ 
  showTaskModal, toggleTaskModal, refreshTasks, setListsRefetch 
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null | any>(null);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [showDateTime, setShowDateTime] = useState({ date: true, time: false });
  const [data, setData] = useState<ListInterface[]>([]);
  const [formData, setFormData] = useState<FormInput>(defaultFormInput);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState("Create new task");

  const { data: getLists, isSuccess, refetch } = useQuery({
    queryKey: ['getLists'],
    queryFn: GetLists
  });

  useEffect(() => {
    if (isSuccess && getLists?.data?.length) {
      setData(getLists.data);
    }
  }, [getLists, isSuccess]);

  useEffect(() => {
    if (formData.name.trim()) {
      setButtonText("Save new task");
    } else {
      setButtonText("Create new task");
    }
  }, [formData.name]);

  useEffect(() => {
    if (error) {
      toast.error(error)
    } else {
      toast.success(success)
    }
  }, [error, success]);

  useEffect(() => {
    setListsRefetch(refetch)
  }, [refetch, setListsRefetch])

  const handleSaveDateChanges = () => {
    setShowDateSelector(false); // Hide date picker
  };

  const handleShowDateAndTime = (dateTime: string) => {
    if (dateTime === 'date') {
      setShowDateTime({ date: true, time: false });
    } else if (dateTime === 'time') {
      setShowDateTime({ date: false, time: true });
    }
    setShowDateSelector(true);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value
    });
  };

  const handleListChange = (list: ListInterface) => {
    setSelectedItem(list)
    setFormData({ ...formData, listId: list.id });
  };

  const handleOptionSelected = (option: PriorityInterface) => {
    if (option.key && option.value) {
      setFormData({ ...formData, priority: option.key });
    }
  };

  const handleDateSelected = (date: Date) => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    setFormData({ ...formData, date: formattedDate });
  };

  const handleTimesSelected = (times: TimesInterface) => {
    console.log(times)
    if (times.startTime && times.endTime) {
      setFormData({ 
        ...formData, 
        startTime: times.startTime,
        endTime: times.endTime
      });
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Task name is required");
      return false;
    } else if (!formData.description.trim()) {
      setError("Task description is required");
      return false;
    } else if (!formData.listId) {
      setError("Task list is required");
      return false;
    } else if (!formData.date) {
      setError("Task date is required");
      return false;
    } else if (!formData.startTime || !formData.endTime) {
      setError("Task times is required");
      return false;
    } else if (!formData.priority) {
      setError("Task priority is required");
      return false;
    }
    setError(null);
    return true;
  };

  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: CreateTask,
    onSuccess: () => {
      setSuccess("Task created successfully");
      setFormData(defaultFormInput);
      setButtonText("Create new task");
      toggleTaskModal();
    },
    onError: ((error: Error) => {
      setError(error.message);
    })
  });

  const handleSubmit = async () => {
    if (!validateForm()) return;
    await addTaskMutation({
      ...formData,
      listId: formData?.listId,
      name: formData?.name,
      description: formData?.description,
      priority: formData?.priority,
      date: formData?.date,
      startTime: formData?.startTime,
      endTime: formData?.endTime,
    });
    refreshTasks();
  };

  return (
    <>
      <BottomModal show={showTaskModal} onClose={toggleTaskModal} title="Modal Title">
        <div>
          <Input 
            className="text-input-gray" 
            placeholder='Create new task' 
            name="name"
            value={formData.name}
            type="text"
            onChange={handleInputChange}
            autoComplete="off"
          />
          <div className="mt-2 flex justify-between">
            <div className="text-input-list-div w-full">
              <InputWithList
                placeholder="Select list"
                data={data || []}
                selectedItem={selectedItem}
                setSelectedItem={handleListChange}
              />
            </div>
            <button
              className="select-date-time"
              onClick={() => handleShowDateAndTime('date')}
            >
              <CalendarDaysIcon className="size-12 w-10 h-13.5 mt-1.5 border-solid border-black text-black bg-gray-300 rounded-md px-2 py-1" />
            </button>
            <button
              className="select-date-time"
              onClick={() => handleShowDateAndTime('time')}
            >
              <TableCellsIcon className="size-12 w-10 h-13.5 mt-1.5 text-white bg-black rounded-md px-2 py-1" />
            </button>
          </div>

          {!showDateSelector 
            ? <>
                <Textarea 
                  className="textarea-gray mt-2" 
                  placeholder='Add note' 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></Textarea>
                <div className="mt-1 mb-1">
                  <DropdownField options={PriorityOptions} onOptionChange={handleOptionSelected} />
                </div>
              </>
            :
            <div className="date-range-wrapper">
              {showDateTime.date && (<DatePicker onDateChange={handleDateSelected} />)}
              {showDateTime.time && (<TimeSelection onTimesChange={handleTimesSelected} />)}
              <button className="save-changes-button" onClick={handleSaveDateChanges}>
                Save Changes
              </button>
            </div>
          }
        </div>
      </BottomModal>

      {!formData.name.trim() && (
        <ModalButton toggleModal={toggleTaskModal}>
          {buttonText}
        </ModalButton>
      )}

      {formData.name.trim() && (
        <ModalButton handleSubmit={handleSubmit}>
          {buttonText}
        </ModalButton>
      )}
    </>
  );
};

export default CreateNewTask;
