import Platform from '@/models/platform';

type CreatePlatformProps = {
  image_url?: string;
  title: string;
  company?: string;
  acquisition_year?: Date;
  user_id: string;
};

export const create = async ({
  image_url,
  title,
  company,
  acquisition_year,
  user_id,
}: CreatePlatformProps) => {
  try {
    const platform = new Platform({
      image_url,
      title,
      company,
      acquisition_year,
      user_id,
    });

    const { _id } = await platform.save();
    return _id;
  } catch (error) {
    console.log(
      `CREATE_PLATFORM: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error creating platform.');
  }
};
