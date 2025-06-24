import Platform from '@/models/platform';

type DeletePlatformProps = {
  id: string;
};

export const deleteById = async ({ id }: DeletePlatformProps) => {
  try {
    const deleted = await Platform.findByIdAndUpdate(id, { is_deleted: true });
    console.log(deleted);

    if (!deleted) {
      return new Error('Platform not found.');
    }

    return deleted;
  } catch (error) {
    console.log(
      `DELETE_PLATFORM: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Error('Error deleting platform.');
  }
};
