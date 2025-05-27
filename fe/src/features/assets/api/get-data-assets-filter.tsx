import { httpClient } from '@/lib'

export const getDataAssetsFilter = async (value: any) => {
  return await httpClient.get('/assets/filter', {
    params: {
      ...value,
    },
  })
}
