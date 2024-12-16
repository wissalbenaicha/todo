import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/CalendarPage.css'; // Fichier CSS personnalisé
import Header from '../components/Header'; // Importer le Header
import Sidbar from '../components/Sidbar';

const localizer = momentLocalizer(moment);

const CalendarPage = ({ onProfileClick }) => { // Prend en charge la fonction pour le profil
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
      {/* Sidebar */}
      <Sidbar />

      {/* Contenu principal */}
      <div className="main-content">
        {/* Header avec gestion du profil */}
        <Header onProfileClick={onProfileClick} />

        {/* Conteneur pour le calendrier */}
        <div className="calendar-container">
          <h1>Calendar</h1>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
            views={['month', 'week', 'day']}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
