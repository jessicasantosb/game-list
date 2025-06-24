import User from '@/models/user';

type RegisterProps = {
  full_name: string;
  email: string;
  password: string;
};

export const register = async ({
  full_name,
  email,
  password,
}: RegisterProps) => {
  try {
    const user = new User({ full_name, email, password });

    const { _id } = await user.save();
    return _id;
  } catch (error) {
    console.log(
      `USER_REGISTER: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error registering user.');
  }
};
