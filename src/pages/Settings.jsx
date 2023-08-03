import { Box, FormHelperText, Grid, Tooltip } from "@mui/material";
import DashboardWrapper from "../components/DashboardWrapper";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { generateRandomNumbers, generatePassword } from "../utils/general";
import DashboardHeader from "../components/DashboardHeader";
import { baseColors } from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import { MdCreate } from "react-icons/md";
import BaseInputPassword from "../components/BaseInputPassword";
import { useNavigate } from "react-router-dom";
import useCustomAlert from "../components/Alert";
import makeApiCall from "../utils/api";
import Storage from "../utils/storage";

function Settings() {
  const [user, setUser] = useState({
    meterNumber: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const customAlert = useCustomAlert()

  // Handle onchange
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // To generate username and password 
  const handleGenerateUser = (type) => {
    console.log("type", type);
    if (type == "meterNumber") {
      setUser({
        ...user,
        meterNumber: generateRandomNumbers(9),
      });
    } else {
      setUser({
        ...user,
        password: generatePassword(10),
      });
    }
  };

  // TO submit the form 
  const handleSubmit = async(event) => {
    event.preventDefault();

    console.log("User", user);

    if (!user.meterNumber || !user.password || !user.role) {
      customAlert.showCustomAlert('Please fill in all fields...', 'error')
      return; 
    }

    const payload = {
      username: user.meterNumber,
      password: user.password,
      passwordConfirm: user.password,
      role: user.role
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
    let createUserRes = await makeApiCall(
      'post',
      `${baseUrl}/api/v1/auth/register`,
      payload,
      header
    )

    console.log('createUserRes', createUserRes)
    if (!createUserRes) {
      console.log('Error adding...')
      customAlert.showCustomAlert('Username/Meter number already exists..!!!', 'error')
      setLoading(false)
    } else {
      setLoading(false)

      // Show alert
      customAlert.showCustomAlert(
        createUserRes?.message,
        'success'
      )

      // Reset the input fields 
      setUser({
        meterNumber: "",
        password: "",
        role: "",
      })

      // Redirect to user 
      setTimeout(() => {
        navigate("/dashboard/users")
      },[1000])
    }
  };

  return (
    <DashboardWrapper>
      <Box className="dashboardChildren noScrollBar">
        <Box mb={5}>
          <DashboardHeader title="Create User" />
        </Box>
        <Box className="genericForm">
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} alignItems={"center"} mb={4}>
              <Grid item xs={9} sm={10}>
                <Box>
                  <TextField
                    required
                    fullWidth
                    id="meterNumber"
                    label="Meter Number"
                    name="meterNumber"
                    value={user.meterNumber}
                    onChange={handleChange}
                    autoComplete="meterNumber"
                    autoFocus
                    sx={{ boxShadow: "" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={2}>
                <Tooltip title="Generate Meter Number">
                  <Box
                    sx={{
                      height: "56px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: `1px solid lightgrey`,
                      borderRadius: "8px",
                      backgroundColor: baseColors.primary,

                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleGenerateUser("meterNumber")}
                  >
                    <MdCreate size={26} />
                  </Box>
                </Tooltip>
              </Grid>
              <FormHelperText sx={{ padding: "0px 20px" }}>
                Click on the pencil icon to generate a username...
              </FormHelperText>
            </Grid>
            <Grid container spacing={2} alignItems={"center"} mb={4}>
              <Grid item xs={9} sm={10}>
                <BaseInputPassword
                  inputName={"password"}
                  inputValue={user.password}
                  inputWidth={"100%"}
                  action={handleChange}
                />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Tooltip title="Generate User Password">
                  <Box
                    sx={{
                      height: "56px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: `1px solid lightgrey`,
                      borderRadius: "8px",
                      backgroundColor: baseColors.primary,

                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleGenerateUser("password")}
                  >
                    <MdCreate size={26} />
                  </Box>
                </Tooltip>
              </Grid>
            </Grid>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role"
                label="Role"
                value={user.role}
                onChange={handleChange}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"consumer"}>Consumer</MenuItem>
              </Select>
            </FormControl>

            <SubmitButton title="Create User" />
          </Box>
        </Box>
      </Box>
    </DashboardWrapper>
  );
}

export default Settings;
