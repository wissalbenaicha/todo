import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const TaskProgress = () => {
  // Données pour chaque tâche
  const progressData = [
    { label: 'In Progress', percentage: 52, color: '#00AEEF' },  // Bleu
    { label: 'Completed', percentage: 79, color: '#00B050' },    // Vert
    { label: 'Not Started', percentage: 25, color: '#D60000' }   // Rouge
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#F7F8FA', padding: '20px', borderRadius: '10px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Task Progress</div>
      {progressData.map((task, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px' }}>
            <CircularProgressbar
              value={task.percentage}
              text={`${task.percentage}%`}
              styles={buildStyles({
                pathColor: task.color,
                textColor: '#000',
                trailColor: '#EFEFEF',
                strokeLinecap: 'round'
              })}
            />
          </div>
          <div style={{ marginTop: '10px' }}>{task.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskProgress;
