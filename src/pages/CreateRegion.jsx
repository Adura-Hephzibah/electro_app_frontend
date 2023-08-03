import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import DashboardWrapper from '../components/DashboardWrapper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DashboardHeader from '../components/DashboardHeader'
import Storage from '../utils/storage'
import SubmitButton from '../components/SubmitButton'
import useCustomAlert from '../components/Alert'
import { useNavigate } from 'react-router-dom'
import makeApiCall from '../utils/api'

function CreateRegion () {
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState('')
  const customAlert = useCustomAlert()
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault()

    if (!region) {
      customAlert.showCustomAlert('Please write the region name', 'error')
      return
    }

    // Set loading to true - at this point, the request to the api commences
    setLoading(true)

    // Construct base url based on environmental variable
    const baseUrl = process.env.REACT_APP_BASE_URL
    const userInStorge =
      Storage.get('electr3k_User') && JSON.parse(Storage.get('electr3k_User'))
    const userToken =
      Storage.get('electr3k_UserToken') &&
      JSON.parse(Storage.get('electr3k_UserToken'))

    const header = {
      Authorization: `Bearer ${userToken}`,
      apiKey: userInStorge?.apiKey
    }

    const payload = {
      name: region
    }
    // make API call
    let createRegionRes = await makeApiCall(
      'POST',
      `${baseUrl}/api/v1/auth/regions`,
      payload,
      header
    )

    console.log('createRegionRes', createRegionRes)
    if (!createRegionRes) {
      console.log('Operation Failed...!!!')
      customAlert.showCustomAlert(
        'Region name already exists!',
        'error'
      )
      setLoading(false)
    } else {
      setLoading(false)

      // Show alert
      customAlert.showCustomAlert(
        createRegionRes?.message || 'Region created successfully!',
        'success'
      )

      // Redirect in 1sec to the users page
      setTimeout(() => {
        navigate('/dashboard/regions')
      }, [1000])
    }
  }

  return (
    <DashboardWrapper>
      <Box className='dashboardChildren noScrollBar'>
        <Box>
          <Box className='genericForm'>
            <DashboardHeader title='Create Region' backIcon={true} />
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
                name='region'
                value={region}
                onChange={e => setRegion(e.target.value)}
                label='Region'
                helperText='Enter the region name'
              />

              <SubmitButton loading={loading} title='Create' />
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardWrapper>
  )
}

export default CreateRegion
