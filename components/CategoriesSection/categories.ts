import { ApiError, nextServer } from '@/lib/api/api';

export type Category = {
  _id: string;
  name: string;
  image: string;
  goodsCount?: number;
};

export const getCategories = async (): Promise<
  Category[]
> => {
  try {
    const { data } = await nextServer.get<{
      data: Category[];
    }>('/categories', {
      params: { page: 1, perPage: 10 },
    });
    return data.data || [];
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error ||
        'Не вдалося отримати категорії'
    );
  }
};
