export class GeneralResponse {
  code: number;

  message: string;

  data: any;

  static of(data: any): GeneralResponse {
    return {
      code: data.code,
      message: data.message,
      data: data.data,
    };
  }
}
