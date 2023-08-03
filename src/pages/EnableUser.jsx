import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import DashboardWrapper from '../components/DashboardWrapper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DashboardHeader from '../components/DashboardHeader'
import Storage from '../utils/storage'
import useCustomAlert from '../components/Alert'
import makeApiCall from '../utils/api'
import { useNavigate } from 'react-router-dom'
import SubmitButton from '../components/SubmitButton'

function EnableUser () {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const customAlert = useCustomAlert()
  const navigate = useNavigate()

  // To handle form submission
  const handleSubmit = async event => {
    event.preventDefault()

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
        status: "active"
      }

    // make API call
    let updateUserRes = await makeApiCall(
      'PATCH',
      `${baseUrl}/api/v1/auth/users/${user?._id}`,
      payload,
      header
    )

    console.log('updateUserRes', updateUserRes)
    if (!updateUserRes) {
      console.log('Operation Failed...!!!')
      customAlert.showCustomAlert('Operation Failed...!!!', 'error')
      setLoading(false)
    } else {
      setLoading(false)

      // Show alert
      customAlert.showCustomAlert(
        updateUserRes?.message || "User's profile updated successfully!",
        'success'
      )

      // Redirect in 1sec to the users page
      setTimeout(() => {
        navigate("/dashboard/users")
      }, [1000])
    }
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
        <Box className='genericForm'>
          <DashboardHeader title='Enable User' backIcon={true} />
          <Box component='form' onSubmit={handleSubmit} noValidate>
            <TextField
              margin='normal'
              required
              fullWidth
              multiline
              name='username'
              value={user?.username}
              helperText='Meter Number(Username)'
            />

            <TextField
              margin='normal'
              required
              fullWidth
              multiline
              name='status'
              value={user?.userStatus}
              helperText='Status'
            />

            <TextField
              margin='normal'
              required
              fullWidth
              multiline
              name='role'
              value={user?.role}
              helperText='Role'
            />

            <TextField
              margin='normal'
              required
              fullWidth
              multiline
              name='electricity_usage'
              value={user?.electricityUsage}
              helperText='Electricity Usage'
            />
            <SubmitButton title='Submit' loading={loading} />
          </Box>
        </Box>
      </Box>
    </DashboardWrapper>
  )
}

export default EnableUser
