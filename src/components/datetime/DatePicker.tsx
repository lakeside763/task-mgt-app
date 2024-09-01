import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({ onDateChange }: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="date-range-picker w-full">
       <Calendar
        date={selectedDate}
        onChange={handleSelect}
        minDate={new Date()}
        className="w-full"
        color="#0066ff"
      />
    </div>
  );
};

export default DatePicker;
