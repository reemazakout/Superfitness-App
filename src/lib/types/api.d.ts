declare type SuccessfulResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  error: string;
};

declare type ApiResponse<T> = ErrorResponse | SuccessfulResponse<T>;
