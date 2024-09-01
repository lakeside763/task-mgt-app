import { FC, useEffect, useState } from "react";

interface TimeSelectionProps {
  onTimesChange: (times: any) => void
}

const TimeSelection: FC<TimeSelectionProps> = ({ onTimesChange }) => {
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const timeSlots = [
    ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
    ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
    ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    ["19:00", "20:00", "21:00", "22:00", "23:00", "24:00"],
  ];

  useEffect(() => {
    onTimesChange({ startTime, endTime })
  }, [startTime, endTime])

  const handleTimeSelect = (
    time: string,
    isStartTime: boolean
  ) => {
    if (isStartTime) {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
  };

  const handleSave = () => {
    if (startTime || endTime) {
      onTimesChange({ startTime, endTime })
    }
  };

  return (
    <div className="time-selection-container">
      <div className="selected-time-display">
        <div className="time">{startTime || "--:--"}</div>
        <div className="separator">-</div>
        <div className="time">{endTime || "--:--"}</div>
      </div>

      <div className="time-columns">
        {timeSlots.map((slot, index) => (
          <div key={index} className="time-column">
            {slot.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time, !startTime || !!(startTime && endTime))}
                className={`time-button ${
                  (startTime === time || endTime === time) ? "selected" : ""
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="custom-time-inputs">
        <input
          type="text"
          placeholder="Custom Hours (from)"
          className="custom-input"
        />
        <input
          type="text"
          placeholder="Custom Hours (until)"
          className="custom-input"
        />
      </div>

      <button type="button" onClick={handleSave} className="save-button">
        Set Times
      </button>
    </div>
  );
};

export default TimeSelection;