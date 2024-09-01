import { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePicker = ({ onDateChange }: any) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    onDateChange(startDate, endDate);
    setState([ranges.selection]);
  };

  return (
    <div className="date-range-picker w-full">
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
        showDateDisplay={true}
        minDate={new Date()}
        showMonthAndYearPickers={false}
        direction="horizontal"
        className="w-full"
      />
    </div>
  );
};

export default DateRangePicker;



// Snippet for date-range

// const [selectedDateRange, setSelectedDateRange] = useState<{
//   startDate: Date | any;
//   endDate: Date | any;
// }>({ startDate: null, endDate: null });
// const [_, setIsDateRangeChanged] = useState(false);

// const handleDateChange = (startDate: Date, endDate: Date) => {  
//   setSelectedDateRange({ 
//     startDate: format(new Date(startDate), 'yyyy-MM-dd'), 
//     endDate: format(new Date(endDate), 'yyyy-MM-dd')
//   });
//   // Prevent closing the date picker until both dates are selected and are different
//   if (startDate && endDate && startDate !== endDate) {
//     setIsDateRangeChanged(true);
//     // setShowDateSelector(false);
//   }
// };
