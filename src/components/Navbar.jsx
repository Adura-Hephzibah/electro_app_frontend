import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { baseColors } from "../constants/colors";
import { makeStyles } from "@material-ui/core/styles";
import BaseInput from "./BaseInput";
import { useNavigate } from "react-router-dom";
import Storage from "../utils/storage";
import { useDispatch } from "react-redux";
import { CssBaseline } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOutCircle } from "react-icons/bi";
import { baseElementHeight, baseFontSizes } from "../constants/generalStylings";

const useStyles = makeStyles((theme) => ({
  navPadding: {
    // Media query for screens equal to or larger than 'xs' breakpoint
    [theme.breakpoints.up("xs")]: {
      padding: "8px 0",
    },

    // Media query for screens equal to or larger than 'sm' breakpoint
    [theme.breakpoints.up("sm")]: {
      padding: "4px 0",
    },

    // Media query for screens equal to or larger than 'md' breakpoint
    [theme.breakpoints.up("md")]: {
      padding: "4px 0",
    },

    // Media query for screens equal to or larger than 'lg' breakpoint
    [theme.breakpoints.up("lg")]: {
      padding: "0 0",
    },
  },
  textField: {
    height: "40px",
    border: "1px solid red",
  },
  primaryColor: {
    color: "#001E3C",
  },
  menuBox: {
    // Styles for the element here...
    transition: "background-color 0.3s ease",
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchBoxWidth: {
    width: "23.75rem",

    // Media query for screens equal to or larger than 'xs' breakpoint
    [theme.breakpoints.up("xs")]: {
      width: "13.25rem",
    },

    // Media query for screens equal to or larger than 'sm' breakpoint
    [theme.breakpoints.up("sm")]: {
      width: "17.75rem",
    },

    // Media query for screens equal to or larger than 'md' breakpoint
    [theme.breakpoints.up("md")]: {
      width: "23.75rem",
    },
  },
  profileCarretSection: {
    // Media query for screens equal to or larger than 'xs' breakpoint
    [theme.breakpoints.up("xs")]: {
      marginLeft: "5px",
    },

    // Media query for screens equal to or larger than 'sm' breakpoint
    [theme.breakpoints.up("sm")]: {
      marginLeft: "10px",
    },

    // Media query for screens equal to or larger than 'md' breakpoint
    [theme.breakpoints.up("md")]: {
      marginLeft: "20px",
    },
  },
  hideSmallScreen: {
    // Media query for screens equal to or larger than 'xs' breakpoint
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },

    // Media query for screens equal to or larger than 'sm' breakpoint
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const drawerWidth = 240;

function Navbar({ handleDrawerToggle }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const userInstorage = Storage.get('electr3k_User') && JSON.parse(Storage.get("electr3k_User"));

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  // TO open the logout menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // TO close the logout menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // To handle logout
  const handleLogout = () => {
    setTimeout(() => {
      // Remove user details, token and permissions from localStorage 
      Storage.remove("electr3k_User")
      Storage.remove("electr3k_UserToken");
      Storage.remove("electr3k_UserPermissions");
      navigate("/");
    }, 500);
  };

  useEffect(() => {
    const userData = Storage.get("admin-data")
      ? JSON.parse(Storage.get("admin-data"))
      : {};
    setAdminData(userData);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid lightgrey",
      }}
      elevation={0}
      className={classes.navPadding}
    >
      <CssBaseline />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <GiHamburgerMenu />
        </IconButton>
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"flex-end"}
          width="100%"
        >
          <BaseInput
            label="Search..."
            variant="filled"
            inputName={"searchValue"}
            inputValue={searchValue}
            inputClass={classes.searchBoxWidth}
            action={handleSearchInput}
            searchIcon={true}
            handleIconAction={() => {
              console.log("About searching...");
            }}
          />
          <Box
            display="flex"
            alignItems={"center"}
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className={classes.menuBox}
          >
            <Box
              component="div"
              backgroundColor={baseColors.secondary}
              color="#fff"
              height={baseElementHeight.logoHeight}
              width={baseElementHeight.logoWidth}
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"100%"}
              fontSize={baseFontSizes.fontTwo}
              className={classes.profileCarretSection}
            >
              {userInstorage?.username?.toUpperCase()?.charAt(0) || "A"}
            </Box>
            <Typography
              variant="h6"
              fontSize={baseFontSizes.fontOne}
              padding={"0 10px"}
              className={classes.hideSmallScreen}
            >
              {userInstorage?.username || "Admin Name"}
            </Typography>
            <IoMdArrowDropdownCircle />
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> My Profile
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            <ListItemIcon>
              <BiLogOutCircle size={28} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
