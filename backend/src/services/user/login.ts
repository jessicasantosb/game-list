import User from '../../models/user';

export const login = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(
      `USER_LOGIN: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('User not found');
  }
};
