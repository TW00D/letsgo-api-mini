export class TokenResponse {
  access_token: string;

  refresh_token: string;

  static of(data: any): TokenResponse {
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  }
}
