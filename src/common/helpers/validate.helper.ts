import { IDateTime } from '../utils/date-time';

export const validateMessage = {
  required: (fieldName: string) => `${fieldName} không được trống.`,

  email: (fieldName: string) =>
    `${fieldName} phải là một địa chỉ email hợp lệ.`,

  uuid: (fieldName: string) => `${fieldName} phải một chuỗi UUID hợp lệ.`,

  string: (fieldName: string) => `${fieldName} phải là một chuỗi kí tự.`,

  length: (fieldName: string, from: number, to: number) =>
    `${fieldName} phải là một chuỗi kí tự từ ${from} đến ${to}.`,

  url: (fieldName: string) => `${fieldName} phải là một đường dẫn hợp lệ.`,

  array: (fieldName: string) => `${fieldName} phải là một mảng.`,

  number: (fieldName: string) => `${fieldName} phải là một số.`,

  boolean: (fieldName: string) => `${fieldName} phải là boolean.`,

  invalid: (fieldName: string) => `${fieldName} không hợp lệ.`,

  dateFormat: (fieldName: string, dateFormat) =>
    `${fieldName} không hợp lệ (${dateFormat}).`,

  after: (fieldName: string, date: IDateTime | string, allowTime?: boolean) =>
    `${fieldName} là một ngày sau ngày ${
      typeof date === 'string'
        ? date
        : date.format(allowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
    }.`,

  afterOrEqual: (
    fieldName: string,
    date: IDateTime | string,
    allowTime?: boolean,
  ) =>
    `${fieldName} là một ngày sau hoặc bằng ngày ${
      typeof date === 'string'
        ? date
        : date.format(allowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
    }.`,

  afterNow: (fieldName: string) => `${fieldName} là một ngày sau hiện tại.`,

  afterOrEqualNow: (fieldName: string) =>
    `${fieldName} là một ngày sau hoặc bằng hiện tại.`,

  before: (fieldName: string, date: IDateTime | string, allowTime?: boolean) =>
    `${fieldName} là một ngày trước ngày ${
      typeof date === 'string'
        ? date
        : date.format(allowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
    }.`,

  beforeOrEqual: (
    fieldName: string,
    date: IDateTime | string,
    allowTime?: boolean,
  ) =>
    `${fieldName} là một ngày trước hoặc bằng ngày ${
      typeof date === 'string'
        ? date
        : date.format(allowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
    }.`,

  beforeNow: (fieldName: string) => `${fieldName} là một ngày trước hiện tại.`,

  beforeOrEqualNow: (fieldName: string) =>
    `${fieldName} là một ngày trước hoặc bằng hiện tại.`,

  min: {
    array: (fieldName: string, min: number) =>
      `${fieldName} tối thiểu ${min} phần tử.`,

    string: (fieldName: string, min: number) =>
      `${fieldName} tối thiểu ${min} ký tự.`,

    number: (fieldName: string, min: number) =>
      `${fieldName} nhỏ nhất là ${min}.`,
  },

  max: {
    array: (fieldName: string, max: number) =>
      `${fieldName} tối đa ${max} phần tử.`,

    string: (fieldName: string, max: number) =>
      `${fieldName} không được lớn hơn ${max} ký tự.`,

    number: (fieldName: string, max: number) =>
      `${fieldName} không được lớn hơn ${max}.`,
  },

  exists: (fieldName: string) => `${fieldName} không tồn tại.`,

  unique: (fieldName: string) => `${fieldName} đã tồn tại.`,

  fileTypeNotCorrect: (fieldName: string, types: string[]) =>
    `${fieldName} phải là một tập tin có định dạng: ${types.join(', ')}`,
};
