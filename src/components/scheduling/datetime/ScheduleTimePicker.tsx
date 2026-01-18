import { ChevronUp, ChevronDown } from 'lucide-react';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { getTimeSlots } from '@/lib/time-utils';

export function ScheduleTimePicker() {
  const { selectedTime, setSelectedTime } = useSchedulingDialog();
  const timeSlots = getTimeSlots();

  const currentIndex = timeSlots.findIndex(
    (slot) => slot.toLowerCase() === selectedTime.toLowerCase()
  );

  const adjustTime = (delta: number) => {
    let newIndex = currentIndex + delta;
    if (newIndex < 0) newIndex = timeSlots.length - 1;
    if (newIndex >= timeSlots.length) newIndex = 0;
    setSelectedTime(timeSlots[newIndex]);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        onClick={() => adjustTime(-1)}
        style={{
          background: 'none',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        title="Earlier (-15 min)"
      >
        <ChevronUp style={{ width: '16px', height: '16px' }} />
      </button>

      <select
        value={selectedTime}
        onChange={handleTimeChange}
        style={{
          padding: '8px 12px',
          fontSize: '14px',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer',
          minWidth: '100px',
        }}
      >
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>

      <button
        onClick={() => adjustTime(1)}
        style={{
          background: 'none',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        title="Later (+15 min)"
      >
        <ChevronDown style={{ width: '16px', height: '16px' }} />
      </button>
    </div>
  );
}
