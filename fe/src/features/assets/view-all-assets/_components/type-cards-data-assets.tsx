import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  Badge,
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui'
import type { AssetsType } from '../model'
import { Info } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ViewCardsDataAssets = ({ assets }: { assets: AssetsType[] }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {assets.map((asset) => (
          <Card
            key={asset.id}
            className='flex h-full flex-row overflow-hidden p-0 transition-all hover:shadow-md'
          >
            <div className='bg-muted relative h-auto w-full overflow-hidden'>
              {asset.imageUpload && (
                <img
                  src={asset.imageUpload}
                  alt={asset.assetName}
                  className='h-full w-full object-cover'
                />
              )}
            </div>

            <div className='flex flex-col items-center justify-between py-6'>
              <div>
                <CardHeader className='px-4 pt-4 pb-0'>
                  <CardTitle
                    className='line-clamp-1 text-lg'
                    title={asset.assetName}
                  >
                    {asset.assetName}
                  </CardTitle>
                  <CardDescription className='flex items-center gap-2'>
                    <span className='font-mono text-xs'>{asset.serialNumber}</span>
                    <Badge
                      variant='outline'
                      className={`${
                        asset.status === 'New'
                          ? 'border-green-200 bg-green-100 text-green-800'
                          : asset.status === 'In Use'
                            ? 'border-blue-200 bg-blue-100 text-blue-800'
                            : asset.status === 'Under Maintenance'
                              ? 'border-amber-200 bg-amber-100 text-amber-800'
                              : asset.status === 'Retired'
                                ? 'border-slate-200 bg-slate-100 text-slate-800'
                                : 'border-red-200 bg-red-100 text-red-800'
                      } flex items-center gap-1`}
                    >
                      {asset.status}
                    </Badge>
                  </CardDescription>
                </CardHeader>

                <CardContent className='flex flex-grow flex-col gap-2 px-4 py-2'>
                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-muted-foreground'>Department:</span>
                      <span className='max-w-[120px] truncate font-medium'>{asset.department?.departmentName}</span>
                    </div>
                  </div>
                  <div className='space-y-2 text-sm'>
                    <div className='flex items-center justify-between gap-3'>
                      <span className='text-muted-foreground'>Category:</span>
                      <span className='max-w-[120px] truncate font-medium'>{asset.category?.categoryName}</span>
                    </div>
                  </div>
                </CardContent>
              </div>
              <CardFooter className=''>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full'
                  asChild
                >
                  <Link to={`/assets/${asset.id}`}>
                    <Info className='mr-2 h-4 w-4' />
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href='#' />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
