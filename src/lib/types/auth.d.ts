declare type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  photo: string;
  createdAt: string;
};

// Login
declare type LoginResponse = {
  token: string;
  user: User;
};

// Forget password
declare type ForgetPasswordResponse = {
  message: string;
  info: string;
};

declare type CreateNewPasswordFeilds = {
  email: string;
  newPassword: string;
}
