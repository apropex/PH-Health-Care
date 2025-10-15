//

/*
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public path?: string,
    customName?: string,
    stack?: string,
  ) {
    super(message);

    // Ensure correct prototype chain (important in TS when extending built-ins)
    Object.setPrototypeOf(this, new.target.prototype);

    // Override of built-in name
    if (customName) this.name = customName;

    // Maintain proper stack trace
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
 

export class ApiErrorr extends Error {
  public statusCode: number;
  public code?: string;
  public path?: string;
  public param?: string;

  constructor(
    statusCode: number,
    message: string,
    code?: string,
    path?: string,
    param?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || "INTERNAL_ERROR";
    this.path = path;
    this.param = param;
  }
}

export class ApiError2 extends Error {
  public statusCode: number;
  public code: string;
  public path?: string;
  public param?: string;

  constructor(
    statusCode: number,
    message: string,
    code?: string,
    path?: string,
    param?: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype); // Fix prototype chain
    this.statusCode = statusCode;
    this.code = code || "INTERNAL_ERROR";
    this.path = path;
    this.param = param;
    this.name = this.constructor.name; // Set proper name
  }
}

 */

interface ApiErrorOptions {
  code?: string;
  path?: string;
  param?: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public path?: string;
  public param?: string;

  constructor(
    statusCode: number,
    message: string,
    options?: ApiErrorOptions, // Object parameter
    stack?: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.statusCode = statusCode;
    this.code = options?.code || "INTERNAL_ERROR";
    this.path = options?.path;
    this.param = options?.param;
    this.name = this.constructor.name;

    // Maintain proper stack trace
    if (stack && stack.trim()) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;

/*
throw new ApiError(
  httpStatus.BAD_REQUEST,
  "Email is required",
  { 
    code: "EMAIL_REQUIRED",
    path: "body",
    param: "email" 
  }
);
*/
