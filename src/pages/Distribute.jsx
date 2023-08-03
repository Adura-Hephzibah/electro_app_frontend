import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import DashboardWrapper from '../components/DashboardWrapper'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import DashboardHeader from '../components/DashboardHeader'
import SubmitButton from '../components/SubmitButton'
import makeApiCall from '../utils/api'
import useCustomAlert from '../components/Alert'
import Storage from '../utils/storage'
import { useNavigate } from 'react-router-dom'

function Distribute () {
  const [regions, setRegions] = useState(null)
  const customAlert = useCustomAlert()
  const [electricity, setElectricity] = useState({
    amount: '',
    region: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // To handle input change
  const handleChange = e => {
    setElectricity({
      ...electricity,
      [e.target.name]: e.target.value
    })
  }

  // To distribute electricity
  const handleSubmit = async event => {
    event.preventDefault()

    if (!electricity.amount || !electricity.region) {
      customAlert.showCustomAlert('Please fill in all fields...', 'error')
      return; 
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
      electricAmount: electricity.amount,
      regionId: electricity.region
    }

    console.log('electricity', electricity)

    // make API call
    let updateUserRes = await makeApiCall(
      'POST',
      `${baseUrl}/api/v1/auth/electricity`,
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
        updateUserRes?.message || "Eelctricity amount was successfully allocated...!",
        'success'
      )

      // Redirect in 1sec to the users page
      setTimeout(() => {
        navigate("/dashboard/regions")
      }, [1000])
    }
  }

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

  useEffect(() => {
    getRegionsApi(setRegions)
  }, [])

  return (
    <DashboardWrapper>
      <Box className='dashboardChildren noScrollBar'>
        <Box mb={5}>
          <DashboardHeader title='Distribute electricity to regions.' />
        </Box>

        <Box className='genericForm'>
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
              type='number'
              name='amount'
              value={electricity.amount}
              onChange={handleChange}
              helperText='Enter in amount of electricity...'
            />

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Region</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                name='region'
                value={electricity.region}
                onChange={handleChange}
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

            <SubmitButton  loading={loading} title='Distribute' />
          </Box>
        </Box>
      </Box>
    </DashboardWrapper>
  )
}

export default Distribute
