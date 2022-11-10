import React from 'react'
import { styled } from '@mui/material/styles'

import { TextField } from '@mui/material'
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#2F2F5A',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E56E52',
      borderWidth: 2,
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2F2F5A',
    },
  },
})

export default CssTextField
