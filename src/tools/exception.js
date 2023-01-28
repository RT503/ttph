import { ERROR_CLASS_TRANSPORT, ERROR_CLASS_FROM_API } from './const-errors';

export default class {
  constructor () {
    this.errorObj = {
      errorClass: ERROR_CLASS_TRANSPORT,
      error: {},
      payload: null
    };
  }

  handleTransportError = function (error) {
    this.errorObj.errors = [{ code: 'Api access error', message: 'Ошибка доступа к API' }];
    if (!error)
      throw this.errorObj;
    if (!error.response)
      throw this.errorObj;
    if (!error.response.status)
      throw this.errorObj;
    this.errorObj.status = error.response.status;
    if (this.errorObj.status === 401)
      this.errorObj.error.message = 'Вы не авторизированы';
    if (this.errorObj.status === 403)
      this.errorObj.error.message = 'Доступ запрещён';
    if (this.errorObj.status === 404)
      this.errorObj.error.message = 'Адрес не найден';
    this.errorObj.error.statusText = error.response.statusText;
    throw this.errorObj;
  };

  processResponseError = function (response, throwIfError = false) {
    this.errorObj.errorClass = ERROR_CLASS_FROM_API;
    if (response.data !== undefined) {
      if (response.data.error) {
        this.errorObj.error = response.data.error;
        throw this.errorObj;
      }
      return response.data;
    }
    this.errorObj.error = { code: 'Api response error', message: 'Неверный ответ от API' };
    this.errorObj.payload = response;
    if (throwIfError)
      throw this.errorObj;
    return response;
  };
}
