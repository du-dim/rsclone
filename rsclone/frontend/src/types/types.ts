export enum Text {
  Wisely = 'Wisely',
  Describe = 'the key to the success of your budget!',
  Signin = 'Sign in',
  Signup = 'Sign up',
  Google = 'Sign with Google',
  Facebook = 'Sign with Facebook',
  Enteremail = 'Enter your username or email address',
  Password = 'Password',
  Forgot = 'Forgot password',
  Repeat = 'Repeat password',
  Noaccount = 'No Account?',
  Haveaccount = 'Have you account?',

}

export enum Links {
  rsshool = 'https://rs.school/',
  Alena = 'https://github.com/KrasAlena',
  Dima = 'https://github.com/du-dim',
  Kate = 'https://github.com/shaustruk/'
}

export interface IBody {
  amount: number,
  date: Date,
  category: string,
  currency: string,
  note: string,
  user_id: string,
}

export interface ILocal {
  amount: string,
  note: string,
}
