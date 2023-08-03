// import React from 'react'
import { Box } from '@mui/material'
import DashboardWrapper from '../components/DashboardWrapper'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import SubmitButton from './SubmitButton'
import DashboardHeader from './DashboardHeader'

function RequestForm ({ request, loading, handleChange, handleSubmitRequest }) {


  // const [time, setTime] = useState(moment(new Date()).format("YYYY-MM-DD"));
  return (
    <Box mt={4}>
      <Box mb={5}>
        <DashboardHeader title='Make Request' />
      </Box>
      <Box
        component='form'
        onSubmit={handleSubmitRequest}
        noValidate
        sx={{ mt: 1 }}
        className='genericForm'
      >
        <TextField
          label='Date'
          type='date'
          name={'dateNeeded'}
          value={request.dateNeeded}
          onChange={(e) => handleChange(e)}
          fullWidth
          required
          helperText='What day do you need electricity?'
        />

        <TextField
          margin='normal'
          required
          fullWidth
          multiline
          label='Reason'
          name={'reason'}
          value={request.reason}
          onChange={(e) => handleChange(e)}
          helperText='Why are you requesting electricity?'
        />

        <TextField
          margin='normal'
          required
          fullWidth
          multiline
          name='electricAmount'
          value={request.electricAmount}
          onChange={(e) => handleChange(e)}
          label='Electricity Amount'
          helperText='Enter the electticity amount in kWH...?'
        />

        <SubmitButton loading={loading} title='Submit Request' />
      </Box>
    </Box>
  )
}

export default RequestForm
