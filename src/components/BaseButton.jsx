import React from 'react';
import Button from '@mui/material/Button';
import { baseColors } from '../constants/colors';
import { CircularProgress, Tooltip } from '@mui/material';
import { MdOutlineCheck } from 'react-icons/md';


function BaseButton({
    title,
    handleClick,
    btnBg,
    hoverBgColor,
    rightIcon,
    btnFontSize,
    padding,
    textColor,
    btnBorder,
    btnClassName,
    loading,
    isSuccess,
    btnType,
    btnDisabled = false,
    toolTipTitle = "",
    btnWidth
}) {


    return (
        <>
            <Tooltip title={toolTipTitle}>
                <Button
                    variant="contained"
                    endIcon={rightIcon || ""}
                    sx={{
                        backgroundColor: btnBg || baseColors.primary,
                        '&:hover': {
                            backgroundColor: hoverBgColor || baseColors.primaryHover,
                        },
                        fontSize: btnFontSize || "",
                        padding: padding ? padding : "",
                        color: textColor || "white",
                        border: btnBorder ? `1px solid ${btnBorder}` : "",
                    }}
                    onClick={handleClick}
                    className={btnClassName}
                    type={btnType ? btnType : "button"}
                    disabled={btnDisabled ? true : false}
                >
                    {loading ? (
                        <>
                            <span>
                                {title}
                            </span>
                            <span style={{ marginLeft: "7px" }}>
                                <CircularProgress size={12} color="inherit" />
                            </span>
                        </>
                    ) : isSuccess ? (
                        <MdOutlineCheck />
                    ) : (
                        title
                    )}
                </Button>
            </Tooltip>
        </>
    )
}

export default BaseButton