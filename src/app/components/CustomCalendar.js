'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

export default function CustomCalendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Meeting',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter title');
    if (title) {
      setEvents([...events, { id: Date.now(), start, end, title }]);
    }
  };

  const handleSelectEvent = (event) => {
    if (confirm(`Delete "${event.title}"?`)) {
      setEvents(events.filter((e) => e.id !== event.id));
    }
  };

  const moveEvent = ({ event, start, end }) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, start, end } : e))
    );
  };

  const resizeEvent = ({ event, start, end }) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, start, end } : e))
    );
  };

  const CustomToolbar = ({ label, onNavigate, onView }) => (
    <div className="flex justify-between items-center mb-4 bg-orange-100 px-4 py-2 rounded-md ">
      <div className="flex gap-2">
        <button className="bg-orange-400 text-white px-2 py-1 rounded" onClick={() => onNavigate('TODAY')}>Today</button>
        <button className="bg-orange-400 text-white px-2 py-1 rounded" onClick={() => onNavigate('PREV')}>‹</button>
        <button className="bg-orange-400 text-white px-2 py-1 rounded" onClick={() => onNavigate('NEXT')}>›</button>
      </div>
      <h2 className="text-xl font-bold text-orange-700">{label}</h2>
      <div className="flex gap-2">
        <button className="bg-orange-400 text-white px-2 py-1 rounded" onClick={() => onView('month')}>Month</button>
        <button className="bg-orange-400 text-white px-2 py-1 rounded" onClick={() => onView('week')}>Week</button>
        <button className="bg-orange-400 text-white px-2 py-1 rounded" onClick={() => onView('day')}>Day</button>
      </div>
    </div>
  );

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#EB5B00',
        color: '#fff',
        borderRadius: '6px',
        border: 'none',
        padding: '2px 6px',
        fontSize: '0.875rem',
      },
    };
  };
return (
  <DndProvider backend={HTML5Backend}>
    <div className="p-4 flex justify-center ">
      <div className="w-full max-w-4xl border-black">
        <DnDCalendar
          localizer={localizer}
          events={events}
          view={currentView}
          date={currentDate}
          onView={setCurrentView}
          onNavigate={setCurrentDate}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          resizable
          selectable
          defaultView={Views.MONTH}
          components={{
            toolbar: CustomToolbar,
          }}
          style={{
            height: '60vh',
            backgroundColor: '#fff8f0',
            borderRadius: '10px',
            padding: '10px',
          }}
          eventPropGetter={(event) => ({
    style: {
      backgroundColor: '#EB5B00',
      borderRadius: '5px',
      color: 'white',
      border: 'none',
      padding: '2px 6px',
    },
          })}
        />
      </div>
    </div>
  </DndProvider>
);

}
