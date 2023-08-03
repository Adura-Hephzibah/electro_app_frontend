
import axios from 'axios';

const makeApiCall = async (method, url, payload = null, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
      headers,
    });

    return response.data;
  } catch (error) {
    console.log('error', error)
  }
};

export default makeApiCall;