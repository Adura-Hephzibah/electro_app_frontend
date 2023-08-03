import { Box } from '@mui/material'
import React from 'react'
import DashboardWrapper from '../components/DashboardWrapper'

function Dashboard () {
  return (
    <DashboardWrapper>
      <Box className='dashboardChildren noScrollBar'>
        <b>Dashboard Page</b>...All your writings/components goes into this
        place
      </Box>
    </DashboardWrapper>
  )
}

export default Dashboard
