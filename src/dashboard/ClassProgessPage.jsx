import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const ClassProgressPage = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetchProgress();
  }, [id]);

  const fetchProgress = async () => {
    try {
      const response = await axios.get(`/api/classes/${id}/progress`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProgress(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  return (
    <div>
      <h1>Class Progress</h1>
      {progress ? (
        <div>
          <p>Title: {progress.title}</p>
          <p>Progress: {progress.progress}%</p>
      
        </div>
      ) : (
        <p><Loading></Loading></p>
      )}
    </div>
  );
};

export default ClassProgressPage;