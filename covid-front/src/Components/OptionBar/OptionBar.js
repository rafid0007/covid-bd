import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { DistrictDataContext } from '../../App';

const OptionBar = () => {
  const [districtData, setDistrictData] = useContext(DistrictDataContext);

  const handleClick = () => {
    setDistrictData({})
  }

  return (
    <div>
      <h2><Link onClick={handleClick} to='/'>Bangladesh </Link>
        {
          districtData.NAME_3 && <b> <ArrowForwardIosIcon /> {districtData.NAME_3}</b>
        }</h2>
    </div>
  );
};

export default OptionBar;