import { useSnackbar } from 'notistack';

const useCustomAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showCustomAlert = (message, status) => {
    enqueueSnackbar(message, {
      variant: status,
      autoHideDuration: 3000, // Adjust the duration as per your requirement
    });
  };

  return { showCustomAlert };
};

export default useCustomAlert;
