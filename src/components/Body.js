
import React, { useState, useEffect } from 'react';

const Body = () => {
    const [subjects, setSubjects] = useState(() => {
        const storedSubjects = JSON.parse(localStorage.getItem('subjects'));
        return storedSubjects || [];
      });
    
      useEffect(() => {
        localStorage.setItem('subjects', JSON.stringify(subjects));
      }, [subjects]);

  const addSubject = (subjectName, studyHours) => {
    const newSubject = { name: subjectName, hours: studyHours };
    setSubjects([...subjects, newSubject]);
  };

  const adjustStudyHours = (index, amount) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += amount;
    setSubjects(updatedSubjects);
  };

  return (
    <div className="EducationContainer">
      <h1>Geekster Education Planners</h1>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const subjectName = e.target.elements.subject.value;
          const studyHours = parseInt(e.target.elements.hours.value);
          if (subjectName && !isNaN(studyHours)) {
            addSubject(subjectName, studyHours);
            e.target.reset();
          }
        }}>
          <input className='search' type="text" name="subject" placeholder='Subject'></input>
          <input className='number' type='number' name="hours" placeholder='Hours'></input>
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <h2>Study Schedule</h2>
        <ul className='data'>
          {subjects.map((subject, index) => (
            <li key={index}>
              {subject.name} - {subject.hours} hours
              <button className='incButton' onClick={() => adjustStudyHours(index, -1)}>  -</button>
              <button className='decButton' onClick={() => adjustStudyHours(index, 1)}>   +</button>
             
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Body;