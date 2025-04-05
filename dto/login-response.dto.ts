export class LoginResponseDto {
  // Snake style because in request header it lowercase
  access_token: string;
  refresh_token: string;
  userName: string;
  userId: number;
}
