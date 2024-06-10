import * as React from 'react';
import { styled,Autocomplete} from '@mui/material/';


const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
  },
  
}));

export default function StyledAutocomplete(props) {
  return <CustomAutocomplete {...props} />;
}