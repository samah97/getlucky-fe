interface InvalidField {
  name: string;
  value: string;
  message: string;
}

export interface ErrorResponse {
  type: string;
  code?: string;
  title: string;
  detail?: string;
  invalidFields?: InvalidField[];
}
