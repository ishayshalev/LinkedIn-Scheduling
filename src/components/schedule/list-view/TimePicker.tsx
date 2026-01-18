import { ScrollArea } from '@/components/ui/scroll-area';
import { getTimeSlots } from '@/lib/time-utils';
import { useRef, useEffect } from 'react';

interface TimePickerProps {
  selectedTime: string;
  onSelect: (time: string) => void;
}

export function TimePicker({ selectedTime, onSelect }: TimePickerProps) {
  const timeSlots = getTimeSlots();
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ block: 'center' });
    }
  }, []);

  return (
    <ScrollArea className="h-64">
      <div className="p-1">
        {timeSlots.map((time) => {
          const isSelected = time === selectedTime;
          return (
            <button
              key={time}
              ref={isSelected ? selectedRef : null}
              onClick={() => onSelect(time)}
              className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                isSelected
                  ? 'bg-linkedin-blue text-white'
                  : 'hover:bg-linkedin-input-bg text-linkedin-text-primary'
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
