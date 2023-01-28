const KEY_ACCESS_TOKEN = 'gkTicketToPhoneToken';

export default {
  getGkId () {
    const result = window.localStorage.getItem(KEY_ACCESS_TOKEN);
    if (result === 'null')
      return null;
    return result;
  },

  saveGkId (token) {
    window.localStorage.setItem(KEY_ACCESS_TOKEN, token);
  },

  destroyGkId () {
    window.localStorage.removeItem(KEY_ACCESS_TOKEN);
  }
};
