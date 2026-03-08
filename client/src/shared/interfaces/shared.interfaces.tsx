export interface ApiErrorDto {
  status: "error";
  message: string;
  data: null;
  stack?: string;
}
