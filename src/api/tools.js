import axios from 'axios';
import Exception from '@/tools/exception.js';

function GetApiUrl () {
  var url;
  if (process.env.NODE_ENV === 'development')
    url = 'http://localhost:50501';
  else
    url = window.location.origin;
  return url;
}

const axiosInstance = axios.create({
  baseURL: GetApiUrl(),
  timeout: 6000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export const http = {
  get: async function (path, config) {
    try {
      const phoneConfirmationToken = localStorage.getItem('gkPhoneConfirmationToken');

      const result = await axiosInstance.get(path, { headers: { 'phone-confirmation-token': phoneConfirmationToken }, ...config });
      return result;
    }
    catch (error) {
      HandleError(error);
    }
  },
  post: async function (path, data, config) {
    try {
      const phoneConfirmationToken = localStorage.getItem('gkPhoneConfirmationToken');

      const result = await axiosInstance.post(path, data, { headers: { 'phone-confirmation-token': phoneConfirmationToken }, ...config });
      return result;
    }
    catch (error) {
      HandleError(error);
    }
  }
};

export function getQueryString (params) {
  const esc = encodeURIComponent;
  const resultArray = [];
  for (const key in params) {
    if ((params[key] === undefined) || (params[key] === null))
      continue;
    if (Array.isArray(params[key])) {
      params[key].forEach(element => {
        resultArray.push(`${esc(key)}=${esc(element)}`);
      });
    }
    else {
      resultArray.push(`${esc(key)}=${esc(params[key])}`);
    }
  }
  if (resultArray.length > 0)
    return `?${resultArray.join('&')}`;
  return '';
}

function HandleError (error) {
  const exception = new Exception();
  exception.handleTransportError(error);
}

export function throwIfError (response) {
  const exception = new Exception();
  const result = exception.processResponseError(response, true);
  return result;
}
