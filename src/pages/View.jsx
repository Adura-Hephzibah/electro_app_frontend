import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import DashboardWrapper from '../components/DashboardWrapper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DashboardHeader from '../components/DashboardHeader'
import Storage from '../utils/storage'

function View () {
  const [user, setUser] = useState({})

  
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      DateOfRequest: data.get('data1'),
      Reason: data.get('data2')
    })
  }

  // Get user saved user from local storage
  useEffect(() => {
    const activeStorageUser =
      Storage.get('active_elect3Cty_user') &&
      JSON.parse(Storage.get('active_elect3Cty_user'))

    if (activeStorageUser) {
      setUser(activeStorageUser)
    }
  }, [])

  return (
    <DashboardWrapper>
      <Box className='dashboardChildren noScrollBar'>
        <Box>
          <Box className='genericForm'>
            <DashboardHeader title='View User Details' backIcon={true} />
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                multiline
                name='username'
                value={user?.username}
                helperText='Meter Number(Username)...(read-only)'
              />

              <TextField
                margin='normal'
                required
                fullWidth
                multiline
                name='status'
                value={user?.userStatus}
                helperText='Status...(read-only)'
              />

              <TextField
                margin='normal'
                required
                fullWidth
                multiline
                name='role'
                value={user?.role}
                helperText='Role...(read-only)'
              />

              <TextField
                margin='normal'
                required
                fullWidth
                multiline
                name='electricity_usage'
                value={user?.electricityUsage}
                helperText='Electricity Usage...(read-only)'
              />

              <TextField
                margin='normal'
                required
                fullWidth
                multiline
                name='connection_status'
                value={user?.isConnected ? 'YES' : 'NO'}
                helperText='Active Connection Status...(read-only)'
              />

              <TextField
                margin='normal'
                required
                fullWidth
                multiline
                name='region'
                value={user?.region?.name || 'null'}
                helperText='Region...(read-only)'
              />

              {/* <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardWrapper>
  )
}

export default View
