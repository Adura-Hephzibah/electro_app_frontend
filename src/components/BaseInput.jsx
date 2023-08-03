import React from "react";
import { Box, FormHelperText, TextField } from '@mui/material'
import { baseElementHeight, baseFontSizes } from '../constants/generalStylings'
import { makeStyles } from '@material-ui/core';
import { IoMdSearch } from 'react-icons/io'
import { baseColors } from "../constants/colors";


const useStyles = makeStyles((theme) => ({
    inputHouseStyles: {
        width: "100% !important"
    },
    searchIconStyles: {
        position: "absolute",
        top: "0",
        right: "0",
        height: "100%",
        width: "38px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: baseColors.secondary,
        color: "#fff",
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",

        "&:hover": {
            cursor: "pointer",
            backgroundColor: baseColors.secondaryHover,
        },
    }
}))


function BaseInput({
    inputName,
    inputValue,
    label,
    variant,
    inputWidth,
    inputHeight,
    action,
    margin,
    inputClass,
    helperText,
    searchIcon,
    borderRadius,
    handleIconAction,
    boxShadow
}) {
    const classes = useStyles()

    return (
        <Box
            position={"relative"}
        >
            <TextField
                name={inputName || "name"}
                label={label || "Search..."}
                variant={variant || "filled"}
                InputProps={{
                    style: {
                        height: inputHeight || baseElementHeight.inputHeight,
                        width: inputWidth || "",
                        fontSize: baseFontSizes.fontOne,
                        margin: margin ? margin : "0",
                        borderRadius: borderRadius || "6px",
                        overflow: "hidden",
                        boxShadow: boxShadow == false ?  "" : "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    }
                }}
                value={inputValue || ""}
                onChange={(e) => action(e)}
                className={inputClass || classes.inputHouseStyles}
            />
            {
                helperText &&
                <FormHelperText id="component-helper-text">
                    {helperText || "Some important helper text"}
                </FormHelperText>
            }
            {
                searchIcon &&
                <Box
                    className={classes.searchIconStyles}
                    onClick={handleIconAction}
                >
                    <IoMdSearch size={20} />
                </Box>
            }
        </Box>
    )
}

export default BaseInput