import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {
    MdOutlineVisibilityOff,
    MdOutlineVisibility
} from "react-icons/md"
import { FormHelperText } from '@mui/material';
import { baseElementHeight, baseFontSizes } from '../constants/generalStylings';



function BaseInputPassword({
    inputName,
    inputValue,
    label,
    variant,
    inputWidth,
    inputHeight,
    action,
    margin,
    inputClass,
    helperText
}) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl
            sx={{
                width: inputWidth || "",
                fontSize: baseFontSizes.fontOne,
                margin: margin ? margin : "0"
            }}
            variant="outlined"
            className={inputClass || ""}
        >
            <InputLabel htmlFor="outlined-adornment-password">{label || "Password"}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label || "Password"}
                name={inputName || "password"}
                value={inputValue || ""}
                onChange={(e) => action(e)}
            />
            {
                helperText &&
                <FormHelperText>
                    {helperText}
                </FormHelperText>
            }
        </FormControl>
    )
}

export default BaseInputPassword