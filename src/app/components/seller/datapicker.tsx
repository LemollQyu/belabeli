type DatePickerProps = {
    startDate: string;
    endDate: string;
    onDateChange: (name: string, value: string) => void;
  };
  
  const DatePicker = ({ startDate, endDate, onDateChange }: DatePickerProps) => (
    <div className="pt-4 px-4 w-full flex justify-center">
      <div className="w-full max-w-md flex items-center justify-between border p-1 rounded-md shadow-sm">
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => onDateChange(e.target.name, e.target.value)}
          className="w-1/2 border-none text-[12px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        />
        <span className="mx-2 text-gray-500 text-[12px]">-</span>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => onDateChange(e.target.name, e.target.value)}
          className="w-1/2 border-none text-[12px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        />
      </div>
    </div>
  );
  
  export default DatePicker;
  