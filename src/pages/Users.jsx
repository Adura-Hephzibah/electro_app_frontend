import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import DashboardWrapper from '../components/DashboardWrapper'
import GroupButton from '../components/GroupButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import makeApiCall from '../utils/api'
import { useSnackbar } from 'notistack'
import useCustomAlert from '../components/Alert'
import Storage from '../utils/storage'
import { BiLogoTripAdvisor } from 'react-icons/bi'


 
function Users () {
  const options = ['view', 'disable', 'enable', 'allocate']
  const navigate = useNavigate()
  const [users, setUsers] = useState(null)
  const customAlert = useCustomAlert()

  const navigator = (options, indexx) => {
    if (options[indexx] == 'disable') {
      navigate('/dashboard/users/disable')
    }
    if (options[indexx] == 'view') {
      navigate('/dashboard/users/view')
    }
    if (options[indexx] == 'enable') {
      navigate('/dashboard/users/enable')
    }
    if (options[indexx] == 'allocate') {
      navigate('/dashboard/users/allocate-user-to-region')
    }
  }

  // To fetch users from the DB 
  const getUsersApi = async (setState) => {
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL
      const userInStorge = Storage.get("electr3k_User") && JSON.parse(Storage.get("electr3k_User"));
      const userToken = Storage.get("electr3k_UserToken") && JSON.parse(Storage.get("electr3k_UserToken"));

      const header = {
        "Authorization": `Bearer ${userToken}`,
        "apiKey": userInStorge?.apiKey
      } 
      const userRes = await makeApiCall(
        'get',
        `${baseUrl}/api/v1/auth/users`,
        null,
        header
      )

      console.log('userRes', userRes)
      if (!userRes) {
        customAlert.showCustomAlert(
          'Failed to fetch users, Unauthorized!',
          'error'
        )
        return
      } 

      // Set state now 
      setState(userRes?.data)
      console.log("hey...")

      return userRes
    } catch (error) {
      // Handle the error here, you can show an error notification or log the error.
      console.error('Error fetching users:', error)
      customAlert.showCustomAlert('Failed to fetch users.', 'error')
      return null
    }
  }

  // Fetch users immediate the page BiLogoTripAdvisor(component mounts) 
  useEffect(() => {
    getUsersApi(setUsers)
  }, [])

  return (
    <DashboardWrapper>
      <Box className='dashboardChildren noScrollBar'>
        <Box mb={5}>
          <DashboardHeader title='All Users' />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Meter Number/Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Electricity Usage</TableCell>
                <TableCell>User Status</TableCell>
                <TableCell>Region</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map(row => (
                <TableRow
                  key={row.username}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.username}
                  </TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.electricityUsage}</TableCell>
                  <TableCell style={{
                          fontWeight: "bold",
                          color:
                            row.userStatus == 'active'
                              ? 'forestgreen'
                              : row.userStatus == 'disabled'
                              ? 'brown'
                              : 'grey'
                        }}>{row.userStatus || "Nil"}</TableCell>
                        <TableCell>{row.region?.name || "Nil"}</TableCell>
                  <TableCell align='right'>
                    <GroupButton options={options} navigator={navigator} item={row} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardWrapper>
  )
}

export default Users
