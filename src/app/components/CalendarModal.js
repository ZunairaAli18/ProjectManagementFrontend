// components/CalendarModal.js
'use client';

import CustomCalendar from './CustomCalendar';

export default function CalendarModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="relative w-[90%] bg-[#fff8f0] max-w-5xl bg- rounded-lg shadow-lg p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>
        <CustomCalendar />
      </div>
    </div>
  );
}
