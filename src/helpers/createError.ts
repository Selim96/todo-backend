interface IError extends Error {
  status?: number;
}

class CreateError {
  private messages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict'
  };

  createError(status: 400 | 401 | 403 | 404 | 409, message = this.messages[status]) {
    const error: IError = new Error(message);
    error.status = status;
    console.log(error);
    return error;
  }
}

export default CreateError;
