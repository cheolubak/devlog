export class FetchError<ErrorType> {
  get data(): ErrorType {
    return this._errorData;
  }
  get header(): Headers {
    return this._response.headers;
  }

  get status(): number {
    return this._response.status;
  }

  get url(): string {
    return this._response.url;
  }

  private _errorData: ErrorType;

  private _response: Response;

  constructor(errorData: ErrorType, response: Response) {
    this._errorData = errorData;
    this._response = response;
  }
}
