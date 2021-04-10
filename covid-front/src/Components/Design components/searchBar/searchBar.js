import React,{useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { DistrictDataContext } from '../../../App';


const CssTextField = withStyles({
  root: {
    '& label': {
      color:'rgba(255,255,255,0.5)',
    },
    '& label.Mui-focused': {
      color: '#fafafa',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fafafa',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fafafa',
      },
      '&:hover fieldset': {
        borderColor: '#fafafa',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
      '& .MuiOutlinedInput-input':{
        color: '#fafafa'
      },
      '& .MuiIconButton-label':{
        color:'#fafafa'
      },
    },
  },
})(TextField);


export default function CustomizedInputs() {

  const [districtData, setDistrictData] = useContext(DistrictDataContext);

  return (
    <div style={{ width: 400 }}>
      <Autocomplete
        id="search-district"
        value={districtData.NAME_3}
        onChange={(event, newValue) => {
          let newDistricData = {...districtData};
          newDistricData.NAME_3 = newValue;
          setDistrictData(newDistricData);
        }}

        options={Districts}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <CssTextField
          {...params}
            label="Search Districts"
            variant="outlined"
            id="district name"
            size='small'
          />
        )}
      />
    </div>
  );
}

const Districts = [
  "Barguna",
  "Barisal",
  "Bhola",
  "Jhalokati",
  "Patuakhali",
  "Pirojpur",
  "Bandarban",
  "Brahmanbaria",
  "Chandpur",
  "Chittagong",
  "Comilla",
  "Cox's Bazar",
  "Feni",
  "Khagrachhari",
  "Lakshmipur",
  "Noakhali",
  "Rangamati",
  "Dhaka",
  "Faridpur",
  "Gazipur",
  "Gopalganj",
  "Kishoreganj",
  "Madaripur",
  "Manikganj",
  "Munshiganj",
  "Narayanganj",
  "Narsingdi",
  "Rajbari",
  "Shariatpur",
  "Tangail",
  "Bagerhat",
  "Chuadanga",
  "Jessore",
  "Jhenaidah",
  "Khulna",
  "Kushtia",
  "Magura",
  "Meherpur",
  "Narail",
  "Satkhira",
  "Jamalpur",
  "Mymensingh",
  "Netrakona",
  "Sherpur",
  "Bogra",
  "Chapainawabganj",
  "Joypurhat",
  "Naogaon",
  "Natore",
  "Pabna",
  "Rajshahi",
  "Sirajganj",
  "Dinajpur",
  "Gaibandha",
  "Kurigram",
  "Lalmonirhat",
  "Nilphamari",
  "Panchagarh",
  "Rangpur",
  "Thakurgaon",
  "Habiganj",
  "Moulvibazar",
  "Sunamganj",
  "Sylhet"
];