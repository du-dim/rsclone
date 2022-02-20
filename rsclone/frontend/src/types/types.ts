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

export interface ICurrent {
  Cur_Abbreviation: string,
  Cur_OfficialRate: number,
  Cur_ID: number,
  Date:string,
  Cur_Scale:number,
  Cur_Name:string,
}

export interface IBody {
  amount: number,
  date: string,
  category: string,
  currency: string,
  note: string,
  user_id: string,
  _id: string,
  USD: number,
  EUR: number,
  RUB: number,
  UAH: number,
  PLN: number,
  GBP: number,
  CNY: number,
}

export interface ILocal {
  amount: string,
  note: string,
}

//* a task
export interface IToDo {
  id: number,
  title: string,
  completed: boolean,
}

export interface ITodoItem extends IToDo {
  toggleToDo: (id: number) => void,
  removeTaskToDo: (id: number) => void,
}

//* array tasks
export interface ITodolistProps {
  items: IToDo[],
  toggleToDo: (id: number) => void,
  removeTaskToDo: (id: number) => void,
}

export interface IData {
  color: string,
  amount: number,
  percent: number,
  startAngle: number,
  endAngle: number,
}

export interface IApiCurrency {
  [key: string] : string
}

export interface IBelarusbankATM {
  id: string,
  area: string,
  city_type: string,
  city: string,
  address_type: string,
  address: string,
  house: string,
  install_place: string,
  work_time: string,
  gps_x: string,
  gps_y: string,
  install_place_full: string,
  work_time_full: string,
  ATM_type: string,
  currency: string,
}

export interface IBelarusbankInfo {
  info_id: number,
  area: string,
  city_type: string,
  city: string,
  address_type: string,
  address: string,
  house: string,
  install_place: string,
  location_name_desc: string,
  work_time: string,
  time_long: string,
  gps_x: string,
  gps_y: string,
  currency: string,
  inf_type: string,
  cash_in_exist: string,
  cash_in: string,
  type_cash_in: string,
  inf_printer: string,
  region_platej: string,
  popolnenie_platej: string,
  inf_status: string,
}

export interface IBelarusbankBranch {
  filial_id: string,
  filial_name: string,
  name_type: string,
  name: string,
  street_type: string,
  street: string,
  home_number: string,
  GPS_X: string,
  GPS_Y: string,
  phone_info: string,
}

export interface IBelapb {
  Id: string,
  BankTitleRu: string,
  RegionId: string,
  RegionTitleRu: string,
  BankAddressRu: string,
  BankPhone: object | string,
  BankWorkTimeRu: string,
  BankLatitude: string,
  BankLongitude: string,
  BankType: string,
}
export interface IBelapbList {
  ExBanksList: {
    Bank: IBelapb[],
  },
}

export interface IResultBank {
  id: string,
  name: string,
  adress: string,
  gps: string[],
  currency: string,
  workTime: string,
  phone: string,
}
