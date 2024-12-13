import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TaskLandingPage from '../components/TaskLandingPage';
import Composant2 from '../components/Composant2';
import Wissal from '../components/Wissal';
import Stay from '../components/Stay';
import Seamless from '../components/Seamless';
import Composant4 from '../components/Composant4';
import Composant3 from '../components/Composant3';
import Faq from '../components/Faq';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <TaskLandingPage />
      <Composant2 />
      <Wissal />
      <Stay />
      <Seamless />
      <Composant4 />
      <Composant3 />
      <Faq />
      <Footer />
    </div>
  );
};

export default LandingPage;
