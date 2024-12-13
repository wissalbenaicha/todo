import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/CalendarPage.css'; // Fichier CSS personnalisé
import Header from '../components/Header'; // Importer le Header
import Sidebar from '../components/Sidebar'; // Importer le Sidebar

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: 'Team Meeting',
      start: new Date(2024, 10, 21, 10, 0),
      end: new Date(2024, 10, 21, 11, 0),
    },
    {
      title: 'Project Deadline',
      start: new Date(2024, 10, 22, 15, 0),
      end: new Date(2024, 10, 22, 16, 0),
    },
  ]);

  return (
    <div className="page-container">
      <Sidebar /> {/* Sidebar sur le côté gauche */}
      
      <div className="main-content"> {/* Contenu principal après Sidebar */}
        <Header /> {/* Header au-dessus de la page */}

        {/* Contenu de la page avec le calendrier */}
        <div className="calendar-container">
          <h1>Calendar</h1>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={['month', 'week', 'day']}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

