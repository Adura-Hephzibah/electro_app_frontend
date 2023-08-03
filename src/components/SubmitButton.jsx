import { Button } from '@mui/material'
import React from 'react'
import { baseColors } from '../constants/colors'
import Loader from './Loader'


function SubmitButton ({ title, loading }) {

  return (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      style={{
        backgroundColor: baseColors.secondary,
        marginTop: "30px",
        transition: 'transform 0.5s ease',
        height: "50px",

        '&:hover': {
          cursor: 'pointer',
          transform: 'translateY(-3px)',
          backgroundColor: `${baseColors.secondaryHover} !important`
        }
      }}
      disabled={loading}
    >
      { loading ? <Loader loading={loading} /> : (title || 'Button Title')}
    </Button>
  )
}

export default SubmitButton
