import {useQuery} from '@tanstack/react-query';

function delay(t: number, cb: () => void) {
  return new Promise((resolve) =>
    setTimeout(() => {
      cb();
      resolve(undefined);
    }, t),
  );
}
export const useData = () => {
  const {data: firstData, isLoading} = useQuery({
    queryKey: ['1'],
    queryFn: async () => {
      await delay(5000, () => {});
      return [{id: 'A'}, {id: 'B'}];
    },
  });

  const {data: secondData, isLoading: isLoadingSecond} = useQuery({
    queryKey: ['2'],
    queryFn: async () => {
      await delay(5500, () => {});
      return firstData?.map((fd, index) => {
        return `Second ${fd.id}-${index + 1}`;
      });
    },
    enabled: !!firstData,
  });

  return {firstData, secondData, isLoading: isLoading || isLoadingSecond};
};
