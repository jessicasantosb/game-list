import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

import { userServices } from '@/services';

type User = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

type RegisterValidationProps = RequestHandler<unknown, unknown, User>;

export const registerValidation: RegisterValidationProps = (req, res, next) => {
  const { full_name, email, password, confirm_password } = req.body;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const nameIsValid = full_name.length >= 3;
  const emailIsValid = emailPattern.test(email);
  const passwordIsValid = passwordPattern.test(password);

  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    password === confirm_password
  ) {
    next();
    return;
  }

  if (!nameIsValid) {
    res.json({ Error: 'invalid name' });
    return;
  }

  if (!emailIsValid) {
    res.json({ Error: 'invalid email' });
    return;
  }

  if (!passwordIsValid) {
    res.json({ Error: 'invalid password' });
    return;
  }

  if (password !== confirm_password) {
    res.json({
      Error: 'Password should be equal to confirm password',
    });
    return;
  }
};

type RegisterBody = {
  full_name: string;
  email: string;
  password: string;
};

export const register: RequestHandler<unknown, unknown, RegisterBody> = async (
  req,
  res,
) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await userServices.register({
    ...req.body,
    password: hashedPassword,
  });

  if (user instanceof Error) {
    res.status(501).json({ Error: user.message });
  }

  res.status(201).json(user);
};
