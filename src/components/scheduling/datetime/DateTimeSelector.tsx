import { Button } from '@/components/ui/button';
import { ScheduleDatePicker } from './ScheduleDatePicker';
import { ScheduleTimePicker } from './ScheduleTimePicker';
import { useSchedulingDialog } from '../SchedulingDialogContext';
import { formatDate } from '@/lib/time-utils';

interface DateTimeSelectorProps {
  onConfirm: () => void;
}

export function DateTimeSelector({ onConfirm }: DateTimeSelectorProps) {
  const { selectedDate, setShowSchedulePicker } = useSchedulingDialog();

  const canConfirm = selectedDate !== null;

  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #e0e0e0',
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
          Select date and time
        </h3>

        {/* Calendar */}
        <ScheduleDatePicker />
      </div>

      {/* Time picker */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>Time:</span>
          <ScheduleTimePicker />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="ghost"
            onClick={() => setShowSchedulePicker(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!canConfirm}
          >
            Schedule{selectedDate ? ` for ${formatDate(selectedDate)}` : ''}
          </Button>
        </div>
      </div>
    </div>
  );
}
