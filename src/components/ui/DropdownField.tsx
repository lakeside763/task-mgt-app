import { Field, Select } from "@headlessui/react"
import { FC, useState } from "react"

interface DropdownFieldProps {
  options: {
    key: any,
    value: any
  }[]
  onOptionChange: (option: any) => void;
}

const DropdownField: FC<DropdownFieldProps> = ({ options, onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0])

  const handleOptionChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(option => option.value === selectedValue)

    if (selectedOption) {
      setSelectedOption(selectedOption);
      onOptionChange(selectedOption)
    }
  }

  return (
    <div className="dropdown-field-wrapper">
      <Field className="w-full">
        <Select 
          className="block dropdown-field-select" 
          name="country" 
          onChange={handleOptionChange}
        >
          <option>Select Priority</option>
          {options.map((option: any) => (
            <option key={option.key}>{option.value}</option>
          ))}
        </Select>
      </Field>
    </div>
  )
}

export default DropdownField
