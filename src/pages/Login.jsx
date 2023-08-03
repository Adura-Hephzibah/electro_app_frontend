import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { baseColors } from '../constants/colors'
import { makeStyles } from '@material-ui/core'
import SubmitButton from '../components/SubmitButton'
import { useNavigate } from 'react-router-dom'
import BaseInputPassword from '../components/BaseInputPassword'
import DashboardHeader from '../components/DashboardHeader'
import makeApiCall from '../utils/api'
import { useSnackbar } from 'notistack'
import Storage from '../utils/storage'
import useCustomAlert from '../components/Alert'

const useStyles = makeStyles(theme => ({
  link: {
    color: baseColors.secondary,
    marginLeft: '5px',

    '&:hover': {
      cursor: 'pointer',
      fontWeight: 600
    }
  }
}))

function Login () {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const customAlert = useCustomAlert()

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    // Set loading to true - at this point, the request to the api commences
    setLoading(true)

    // Construct base url based on environmental variable
    const baseUrl = process.env.REACT_APP_BASE_URL

    // make API call
    let loginRes = await makeApiCall(
      'post',
      `${baseUrl}/api/v1/auth/login`,
      user,
      {}
    )

    console.log('loginRes', loginRes)
    if (!loginRes) {
      console.log('Invalid credentials...')
      customAlert.showCustomAlert('Invalid Credentials', 'error')
      setLoading(false)
    } else {
      setLoading(false)

      // Show alert
      customAlert.showCustomAlert(
        'Login Successful, Redirecting...!!!',
        'success'
      )

      // Construct admin permissions
      const adminPermissions = [
        'dashboard',
        'users',
        'requests',
        'regions',
        'distribute',
        'settings'
      ]

      // Construct user permissions
      const consumerPermissions = ['dashboard', 'requests']

      const userPermissions =
        loginRes.data?.user?.role == 'admin'
          ? adminPermissions
          : consumerPermissions

      // Save user's details to localStorage
      Storage.set('electr3k_User', JSON.stringify(loginRes.data?.user))

      // Set token to storage
      Storage.set('electr3k_UserToken', JSON.stringify(loginRes.token))

      // Set permissions to storage
      Storage.set('electr3k_UserPermissions', JSON.stringify(userPermissions))

      // Redirect to the dashboard
      setTimeout(() => {
        navigate('/dashboard')
      }, [2000])
    }
  }

  return (
    <Box className='loginForm'>
      <Box mb={2}>
        <DashboardHeader title='LOGIN' />
      </Box>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          required
          fullWidth
          label='Meter Number/Username'
          name='username'
          value={user.username}
          onChange={handleChange}
          style={{ marginBottom: '30px' }}
        />
        <BaseInputPassword
          inputName={'password'}
          inputValue={user.password}
          inputWidth={'100%'}
          action={handleChange}
        />
        <SubmitButton title='Sign In' loading={loading} />
      </Box>
    </Box>
  )
}

export default Login
