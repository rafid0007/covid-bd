import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { DistrictDataContext } from '../../../App';

const OptionBar = () => {
  const [districtData, setDistrictData] = useContext(DistrictDataContext);

  const handleClick = () => {
    setDistrictData({})
  }

  return (
    <div>
      <h2 style={{display:'flex',alignItems:'center'}}>
        <h3 style={{cursor:'pointer'}} onClick={handleClick}>Bangladesh </h3>
        {
          districtData.NAME_3 && <b style={{display:'flex',alignItems:'center'}}> <ArrowForwardIosIcon /> {districtData.NAME_3}</b>
        }
      </h2>
    </div>
  );
};

export default OptionBar;