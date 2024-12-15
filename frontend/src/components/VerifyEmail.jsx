import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Importer useNavigate
import '../styles/VerifyEmail.css';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Initialiser useNavigate
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setMessage('Token manquant. Veuillez vérifier votre email.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/verify-email/', {
          params: { token },
        });
        if (response.data.success) {
          setMessage('Email vérifié avec succès!');
          setVerified(true);
        } else {
          setMessage('Échec de la vérification. Veuillez réessayer.');
        }
      } catch (error) {
        setMessage(error.response?.data?.message || 'Erreur lors de la vérification. Token invalide ou expiré.');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [searchParams]);

  const handleSkip = () => {
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-box">
        <h1 className="verify-email-title">Vérifiez votre email</h1>
        {loading ? (
          <p className="verify-email-loading">Validation en cours...</p>
        ) : (
          <p className={verified ? 'verify-email-success' : 'verify-email-error'}>
            {message}
          </p>
        )}
        {!loading && (
          <div className="verify-email-actions">
            {verified ? (
              <p className="verify-email-success-message">Votre email a été vérifié avec succès !</p>
            ) : (
              <button className="verify-email-button" onClick={handleSkip}>
                Passer maintenant
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
