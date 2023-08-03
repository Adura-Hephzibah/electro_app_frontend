import { Box, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DashboardWrapper from '../components/DashboardWrapper'
import GroupButton from '../components/GroupButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DashboardHeader from '../components/DashboardHeader'
import useCustomAlert from '../components/Alert'
import Storage from '../utils/storage'
import makeApiCall from '../utils/api'
import { baseColors } from '../constants/colors'
import { useNavigate } from 'react-router-dom'

function Regions () {
  const options = ['approve', 'reject', 'delete']
  const navigate = useNavigate()
  const [region, setRegions] = useState(null)
  const customAlert = useCustomAlert()

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
      customAlert.showCustomAlert('Failed to fetch regions.', 'error')
      return null
    }
  }

  // To navigate the admin to the page where he'll create region 
  const handleNavigate = () => {
    navigate("/dashboard/regions/create")
  }

  useEffect(() => {
    getRegionsApi(setRegions)
  }, [])

  function createData (name, population, electricityUsage, actions) {
    return { name, population, electricityUsage, actions }
  }

  const rows = [
    createData('abcd123', 'consumer'),
    createData('efgh456', 'consumer'),
    createData('ijkl789', 'consumer')
  ]

  return (
    <DashboardWrapper>
      <Box className='dashboardChildren noScrollBar'>
        <Box mb={5} display={'flex'} justifyContent={'space-between'}>
          <DashboardHeader title='All Regions' />
          <Button
            style={{
              backgroundColor: baseColors.secondary,
              color: "white"
            }}
            onClick={handleNavigate}
          >
            Create Region
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Total Power</TableCell>
                {/* <TableCell align="right">Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {region?.map(row => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell>{row.population || '0'}</TableCell>
                  <TableCell>{row.totalPower}</TableCell>
                  {/* <TableCell align="right">
                    <GroupButton options={options} />
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardWrapper>
  )
}

export default Regions
