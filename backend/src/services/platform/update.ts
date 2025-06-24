import Platform from '@/models/platform';

type UpdatePlatformProps = {
  id: string;
  data: Partial<{
    image_url: string;
    title: string;
    company: string;
    acquisition_year: Date;
  }>;
};

export const updateById = async ({ id, data }: UpdatePlatformProps) => {
  try {
    const updated = await Platform.findByIdAndUpdate(id, { $set: data });

    if (!updated) {
      return new Error('Platform not found.');
    }

    return updated;
  } catch (error) {
    console.log(
      `UPDATE_PLATFORM: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error updating platform.');
  }
};
