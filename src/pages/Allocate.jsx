import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import DashboardWrapper from '../components/DashboardWrapper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import DashboardHeader from '../components/DashboardHeader'
import Storage from '../utils/storage'
import makeApiCall from '../utils/api'
import useCustomAlert from '../components/Alert'
import SubmitButton from '../components/SubmitButton'
import { useNavigate } from 'react-router-dom'

function Allocate () {
  const [user, setUser] = useState({})
  const [regions, setRegions] = React.useState('')
  const customAlert = useCustomAlert()
  const [assignedRegion, setAssignedRegion] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // Fetch all regions from the db and use in the dropdown
  const getRegionsApi = async setState => {
    try {
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
      const regionRes = await makeApiCall(
        'get',
        `${baseUrl}/api/v1/auth/regions`,
        null,
        header
      )

      console.log('regionRes', regionRes)
      if (!regionRes) {
        customAlert.showCustomAlert(
          'Failed to fetch regions, Unauthorized!',
          'error'
        )
        return
      }

      // Set state now
      setState(regionRes?.regions)
      console.log('hey...')

      // Save user's details to localStorage
      Storage.set('electr3k_Region', JSON.stringify(regionRes.regions))

      return regionRes
    } catch (error) {
      // Handle the error here, you can show an error notification or log the error.
      console.error('Error fetching regions:', error)
      // customAlert.showCustomAlert("Failed to fetch regions.", "error");
      return null
    }
  }

  // To handle form submission
  const handleSubmit = async event => {
    event.preventDefault()

    if (!assignedRegion) {
      customAlert.showCustomAlert('Please select a region...', 'error')
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
      userId: user._id,
      regionId: assignedRegion
    }
    // make API call
    let allocateRes = await makeApiCall(
      'POST',
      `${baseUrl}/api/v1/auth/regions/allocate-user`,
      payload,
      header
    )

    console.log('allocateRes', allocateRes)
    if (!allocateRes) {
      console.log('Operation Failed...!!!')
      customAlert.showCustomAlert(
        'User is already assigned to the region.!!!',
        'error'
      )
      setLoading(false)
    } else {
      setLoading(false)

      // Show alert
      customAlert.showCustomAlert(
        allocateRes?.message || 'User successfully allocated to region!',
        'success'
      )

      // Redirect in 1sec to the users page
      setTimeout(() => {
        navigate('/dashboard/users')
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

    // Fetch all regions
    getRegionsApi(setRegions)
  }, [])

  return (
    <DashboardWrapper>
      <Box className='dashboardChildren noScrollBar'>
        <Box className='genericForm'>
          <DashboardHeader title='Allocate User To Region' backIcon={true} />
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
              helperText="User's meter number...(read-only)"
            />

            <TextField
              margin='normal'
              required
              fullWidth
              multiline
              name='userStatus'
              value={user?.userStatus}
              helperText="User's status...(read-only)"
            />

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Region</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='region'
                value={assignedRegion}
                onChange={e => setAssignedRegion(e.target.value)}
              >
                {regions != null && regions?.length > 0 ? (
                  regions?.map((item, index) => (
                    <MenuItem value={item._id} key={index}>
                      {item?.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={''}>"</MenuItem>
                )}
              </Select>
            </FormControl>

            <SubmitButton title='Submit' loading={loading} />
          </Box>
        </Box>
      </Box>
    </DashboardWrapper>
  )
}

export default Allocate
