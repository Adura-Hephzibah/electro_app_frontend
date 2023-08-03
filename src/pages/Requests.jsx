import { Box } from '@mui/material'
import DashboardWrapper from '../components/DashboardWrapper'
import React, { useEffect, useState } from 'react'
import RequestForm from '../components/RequestForm'
import GroupButton from '../components/GroupButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DashboardHeader from '../components/DashboardHeader'
import Storage from '../utils/storage'
import useCustomAlert from '../components/Alert'
import { useNavigate } from 'react-router-dom'
import makeApiCall from '../utils/api'
import moment from 'moment'

function Requests () {
  const options = ['approve', 'reject', 'delete']
  const navigate = useNavigate()
  const [requests, setRequests] = useState(null)
  const customAlert = useCustomAlert()
  const userInstorage =
    Storage.get('electr3k_User') && JSON.parse(Storage.get('electr3k_User'))
  const userRole = userInstorage?.role
  const [request, setRequest] = useState({
    reason: '',
    dateNeeded: moment(new Date()).format('YYYY-MM-DD'),
    electricAmount: ''
  })
  const [loading, setLoading] = useState(false)

  // To handle change
  const handleChange = e => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value
    })
  }

  // To submit a request
  const handleSubmitRequest = async e => {
    e.preventDefault()

    const payload = {
      message: request.reason,
      dateOfRequest: request.dateNeeded,
      userId: userInstorage._id
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

    // make API call
    let addReqRes = await makeApiCall(
      'post',
      `${baseUrl}/api/v1/auth/requests`,
      payload,
      header
    )

    console.log('addReqRes', addReqRes)
    if (!addReqRes) {
      console.log('Error adding...')
      customAlert.showCustomAlert('Invalid Credentials', 'error')
      setLoading(false)
    } else {
      setLoading(false)

      // Show alert
      customAlert.showCustomAlert(addReqRes?.message, 'success')

      // Reset the input fields
      setRequest({
        reason: '',
        dateNeeded: moment(new Date()).format('YYYY-MM-DD'),
        electricAmount: ''
      })
    }
  }

  // To fetch users from the DB
  const getAllRequests = async setState => {
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
      const reqRes = await makeApiCall(
        'get',
        `${baseUrl}/api/v1/auth/requests`,
        null,
        header
      )

      console.log('reqRes', reqRes)
      if (!reqRes) {
        customAlert.showCustomAlert(
          'Failed to fetch requests, Unauthorized!',
          'error'
        )
        return
      }

      // Set state now
      setState(reqRes?.requests)

      return reqRes
    } catch (error) {
      // Handle the error here, you can show an error notification or log the error.
      console.error('Error fetching requests:', error)
      customAlert.showCustomAlert('Failed to fetch requests.', 'error')
      return null
    }
  }

  // Fetch users immediate the page BiLogoTripAdvisor(component mounts)
  useEffect(() => {
    getAllRequests(setRequests)
  }, [])

  // To handle update actions
  const handleUpdateRequest = async (type, item) => {
    console.log('type', type)
    console.log('item', item)

    if (type == 'reject' || type == 'approve') {
      const payload = {
        status: type == 'reject' ? 'rejected' : 'approved'
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

      // make API call
      let updateReqRes = await makeApiCall(
        'PUT',
        `${baseUrl}/api/v1/auth/requests/${item?._id}`,
        payload,
        header
      )

      console.log('updateReqRes', updateReqRes)
      if (!updateReqRes) {
        console.log('Error adding...')
        customAlert.showCustomAlert('Invalid Credentials', 'error')
        setLoading(false)
      } else {
        setLoading(false)

        // Show alert
        customAlert.showCustomAlert(
          `${updateReqRes?.message} Kindly refresh!`,
          'success'
        )
      }
    } else {
      console.log('Deleting...')
    }
  }

  return (
    <DashboardWrapper>
      <Box className='dashboardChildren noScrollBar'>
        {userRole == 'admin' ? (
          <>
            <Box mb={5}>
              <DashboardHeader title='All Requests' />
            </Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size='small'
                aria-label='a dense table'
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Meter Number</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date Of Request</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests?.map(row => (
                    <TableRow
                      key={row.meterNumber}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {row?.userId?.username || 'null'}
                      </TableCell>
                      <TableCell>{row.message}</TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color:
                            row.requestStatus == 'approved'
                              ? 'forestgreen'
                              : row.requestStatus == 'rejected'
                              ? 'brown'
                              : 'grey'
                        }}
                      >
                        {row.requestStatus}
                      </TableCell>
                      <TableCell>{row.dateOfRequest}</TableCell>
                      <TableCell align='right'>
                        <GroupButton
                          options={options}
                          item={row}
                          action={handleUpdateRequest}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <RequestForm
            loading={loading}
            request={request}
            handleChange={handleChange}
            handleSubmitRequest={handleSubmitRequest}
          />
        )}
      </Box>
    </DashboardWrapper>
  )
}

export default Requests
