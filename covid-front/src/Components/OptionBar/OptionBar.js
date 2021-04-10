import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const OptionBar = () => {
  const [district, setDistrict] = useState('Dhaka')
  return (
    <div>
      <h2><Link to='/'>Bangladesh </Link>
        {
          district && <b> <ArrowForwardIosIcon /> {district}</b>
        }</h2>
    </div>
  );
};

export default OptionBar;