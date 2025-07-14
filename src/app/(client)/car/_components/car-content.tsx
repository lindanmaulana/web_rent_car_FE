'use client';

import { ErrorUi } from '@/components/feedbacks/error-ui';
import { useCarGetAll } from '@/hooks/car';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CarListSkeleton } from '../../home/_components/car-list-skeleton';
import { CarList } from './car-list';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export const CarContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const carGetAll = useCarGetAll({ params: params.toString() });

  if (carGetAll.isLoading) return <CarListSkeleton />;
  if (carGetAll.isError) return <ErrorUi message={carGetAll.error?.message} />;

  const data = carGetAll.data.data
  const pagination = carGetAll.data.pagination
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.currentPage ?? 1;
  const paginationPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePagination = (page: number) => {
    const urlParams = new URLSearchParams(window.location.search)

    urlParams.set('page', page.toString())

    router.replace(`${pathname}?${urlParams.toString()}`)
  }

  const handleLimit = (limit: string) => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('page', '1');
    urlParams.set('limit', limit);

    router.replace(`${pathname}?${urlParams.toString()}`);
  };

  return (
    <div className="flex flex-col justify-between gap-6">
      <CarList cars={data} />

      <div className='flex items-center justify-between'>
        <div className='w-1/2 flex items-center gap-2'>
          <Select onValueChange={(value) => handleLimit(value)}>
            <SelectTrigger>
              <SelectValue placeholder={params.get('limit')} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <h4 className='text-sm'>data per halaman</h4>
        </div>

        <Pagination className='w-1/2 flex items-center justify-end'>
            <PaginationContent>
                <PaginationItem>
                    <Button onClick={() => handlePagination(currentPage - 1)} disabled={!pagination?.hashPrevPage}>
                        <FaAngleLeft />
                    </Button>
                </PaginationItem>

                {paginationPages.map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink onClick={() => handlePagination(page)} isActive={currentPage === page} className='cursor-pointer'>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <Button onClick={() => handlePagination(currentPage + 1)} disabled={!pagination?.hashNextPage}>
                        <FaAngleRight />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
