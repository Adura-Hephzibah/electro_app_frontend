import * as React from 'react'
import { Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { navItems } from '../constants/navlist'
import { baseColors } from '../constants/colors'
import BaseButton from './BaseButton'
import { IoMdAdd } from 'react-icons/io'
import {
  baseElementHeight,
  baseFontSizes,
  drawerWidth
} from '../constants/generalStylings'
import { makeStyles } from '@material-ui/core'
import { HiLightBulb, HiOutlineLightBulb } from 'react-icons/hi'
import Authorized from '../pages/Authorized'

const useStyles = makeStyles(theme => ({
  navMenuIcon: {
    fontSize: '28px',

    // Media query for screens equal to or larger than 'xs' breakpoint
    [theme.breakpoints.up('xs')]: {
      fontSize: '22px'
    },

    // Media query for screens equal to or larger than 'md' breakpoint
    [theme.breakpoints.up('md')]: {
      fontSize: '24px'
    },

    // Media query for screens equal to or larger than 'lg' breakpoint
    [theme.breakpoints.up('lg')]: {
      fontSize: '28px'
    }
  },
  navMenuText: {
    fontSize: '28px'
  },
  logoBox: {
    // Media query for screens equal to or larger than 'xs' breakpoint
    [theme.breakpoints.up('xs')]: {
      padding: '2.25rem 20px !important'
    },

    // Media query for screens equal to or larger than 'lg' breakpoint
    [theme.breakpoints.up('lg')]: {
      padding: '2rem 20px !important'
    }
  },
  marginTop: {
    marginTop: '24%'
  }
}))

export default function Sidebar (props) {
  const classes = useStyles()
  const { window, mobileOpen, handleDrawerToggle, children } = props
  const navigate = useNavigate()

  const handleNavigate = route => {
    navigate(route)
  }

  const drawer = (
    <>
      {/* Logo - starts  */}
      <Box
        height={baseElementHeight.logoSectionHeight}
        display={'flex'}
        alignItems={'center'}
        className={classes.logoBox}
      >
        <Box
          height={baseElementHeight.logoHeight}
          width={baseElementHeight.logoWidth}
          borderRadius={'100%'}
          border={`1px solid ${baseColors.secondary}`}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          color={baseColors.tertiary}
        >
          <HiOutlineLightBulb size={26} />
        </Box>
        <Typography
          ml='10px'
          fontSize={baseFontSizes.logoFontSize}
          fontWeight={700}
          color={baseColors.secondary}
        >
          Elec<span style={{ color: baseColors.tertiary }}>3C</span>ty
        </Typography>
      </Box>
      {/* Logo - ends  */}
      <Divider />
      <List>
        {navItems.map(({ name, icon, path, permission }, index) => (
          <Authorized permission={permission}>
            <ListItem
              key={index}
              disablePadding
              onClick={() => handleNavigate(path)}
              style={{ margin: '30px 0' }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{ color: baseColors.secondary, fontWeight: 700 }}
                  className={classes.navMenuIcon}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText className={classes.navMenuText}>
                  <Typography
                    sx={{ color: baseColors.secondary, fontWeight: 500 }}
                  >
                    {name}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Authorized>
        ))}
      </List>
    </>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar - starts  */}
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* Small Screen */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>

        {/* Medium-Large Screen */}
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Sidebar - ends  */}

      {/* Right part - children starts */}
      <Box
        component='main'
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {/* <Toolbar /> */}
        {children}
      </Box>
      {/* Right part - children ends */}
    </Box>
  )
}
