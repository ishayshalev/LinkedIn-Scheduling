import { Calendar } from '@/components/ui/calendar';
import { useSchedulingDialog } from '../SchedulingDialogContext';

export function ScheduleDatePicker() {
  const { selectedDate, setSelectedDate } = useSchedulingDialog();

  // Disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Calendar
        mode="single"
        selected={selectedDate || undefined}
        onSelect={(date) => setSelectedDate(date || null)}
        disabled={{ before: today }}
        initialFocus
      />
    </div>
  );
}
