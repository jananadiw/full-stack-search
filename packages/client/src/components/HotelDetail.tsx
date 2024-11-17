import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HotelDetail: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const handleGoHome = () => navigate(`/`)
  return (
    <div>
      Hotel details for: {id}
      <p onClick={()=> handleGoHome()}>Go home</p>
    </div>
  )
}

export default HotelDetail;
