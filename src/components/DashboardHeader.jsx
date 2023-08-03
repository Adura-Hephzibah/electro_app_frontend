import { Box, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { handleGoPrevious } from '../utils/general'

const useStyles = makeStyles(theme => ({
  backBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

function DashboardHeader ({ title, backIcon }) {
  const classes = useStyles()
  return (
    <Box display={'flex'} alignItems={'center'}>
      {backIcon && (
        <Box
          style={{
            border: '1px solid lightgrey',
            borderRadius: '4px',
            padding: '4px 8px',
            marginRight: '10px'
          }}
          className={classes.backBtn}
          onClick={handleGoPrevious}
        >
          <MdArrowBack />
        </Box>
      )}
      <Typography component='h1' variant='h5' fontWeight={'bolder'} fontSize={'20px'}>
        {title || 'Title Here...'}
      </Typography>
    </Box>
  )
}

export default DashboardHeader
