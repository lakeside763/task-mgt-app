import { FC, useState } from 'react';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid';

interface InputWithListProps {
  placeholder: string;
  data: any[];
  selectedItem: any;
  setSelectedItem: (item: any) => void;
}

const InputWithList: FC<InputWithListProps> = ({ placeholder, data, selectedItem, setSelectedItem }) => {
  const [query, setQuery] = useState('');

  const filteredData =
    query === ''
      ? data
      : data.filter((item: any) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={selectedItem} onChange={setSelectedItem}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none sm:text-sm">
          <ComboboxInput
            placeholder={placeholder}
            className="w-full text-input-list py-3.5 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(dataItem: any) => dataItem?.name}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto z-[1005] rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredData.length === 0 && query !== '' ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredData.map((dataItem: any) => (
              <ComboboxOption
                key={dataItem.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  }`
                }
                value={dataItem}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {dataItem.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-white' : 'text-indigo-600'
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

export default InputWithList;
