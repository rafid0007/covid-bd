import React, { useContext } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { DistrictDataContext } from '../../../App';

const OptionBar = () => {
  const [districtData, setDistrictData] = useContext(DistrictDataContext);

  const handleClick = () => {
    setDistrictData({})
  }

  return (
    <div style={{ display: 'flex', backgroundColor: '#fff', padding: '1rem', borderRadius: '5px' }}>
      <h2 style={{ cursor: 'pointer' }} onClick={handleClick}>Bangladesh </h2>
      {
        districtData.NAME_3 && <h2 style={{ display: 'flex', alignItems: 'center' }}> <ArrowForwardIosIcon /> {districtData.NAME_3}</h2>
      }
    </div>
  );
};

export default OptionBar;