import { Box, Typography } from '@mui/material'
import React from 'react'
import { baseColors } from '../constants/colors'
import { useNavigate } from 'react-router-dom'
import Storage from '../utils/storage'

function UnAuthorized () {
  const navigate = useNavigate()

  const backToLogin = () => {
    // Remove user details, token and permissions from localStorage
    Storage.remove('electr3k_User')
    Storage.remove('electr3k_UserToken')
    Storage.remove('electr3k_UserPermissions')
    navigate('/')
  }
  return (
    <Box height={'70vh'}>
      <Box
        border={`1px solid ${baseColors.secondary}`}
        borderRadius={'6px'}
        padding={'40px'}
        margin={'10% auto'}
        sx={{
          width: '70%',
          height: '200px',
          backgroundColor: baseColors.primary,
          textAlign: 'center',
          color: baseColors.secondary,
          fontWeight: 800,
          fontSize: '28px'
        }}
      >
        You are not authorized to view that page.
        <Typography
          onClick={() => backToLogin()}
          style={{
            cursor: 'pointer',
            width: '200px',
            padding: '15px 0',
            border: `1px solid ${baseColors.secondary}`,
            borderRadius: '4px',
            fontWeight: 600,
            margin: '50px auto 0',

            '&:hover': {
              fontWeight: 800
            }
          }}
        >
          Back To Login
        </Typography>
      </Box>
    </Box>
  )
}

export default UnAuthorized
