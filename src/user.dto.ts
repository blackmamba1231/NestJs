// create-user.dto.ts
export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly phone: string;
    readonly referalcode: string | "";

  }
  export class loginDto{
    readonly email: string;
    readonly password: string;
  }
  export class CreateAccountDto{
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly phone: string;
  }
  