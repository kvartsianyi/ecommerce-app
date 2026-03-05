export type LoginBody = {
  email: string;
  password: string;
};

export type RegistrationBody = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

export type RegistrationForm = RegistrationBody & {
  confirmPassword: string;
};
