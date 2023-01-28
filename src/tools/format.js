import moment from 'moment';

export function formatStringDate (stringValue) {
  if (stringValue === null)
    return null;
  return moment(new Date(stringValue)).format('YYYY-MM-DD');
}

export function formatStringDateTime (stringDateTime) {
  if (stringDateTime === null)
    return null;
  const asDate = new Date(stringDateTime);
  return `${asDate.toLocaleDateString()}, ${('0' + asDate.getHours()).slice(-2) + ':' + ('0' + asDate.getMinutes()).slice(-2)}`;
}

export const isoDate = (value) => (new Date(value - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
export const isoLocalDateTime = (value) => (new Date(value - (new Date()).getTimezoneOffset() * 60000)).toISOString();

