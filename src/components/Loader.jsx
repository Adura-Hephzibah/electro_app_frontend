import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { baseColors } from '../constants/colors';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: baseColors.primary,
  height: "20px",
  width: "20px"
};

function Loader ({loading}) {
  return (
    <ClipLoader
      color={baseColors.primary}
      loading={loading}
      cssOverride={override}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  )
}

export default Loader
