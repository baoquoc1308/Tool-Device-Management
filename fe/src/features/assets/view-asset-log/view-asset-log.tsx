import { getData } from '@/utils'
import { useEffect, useState } from 'react'
import { getAssetLog } from '../api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, LoadingSpinner, ScrollArea } from '@/components/ui'
import type { AssetLogArray } from './model'
import { LogIcon, LogInformation } from './_components'

const ViewAssetLog = ({ id }: { id: string }) => {
  const [assetLog, setAssetLog] = useState<AssetLogArray>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await getData(() => getAssetLog(id), setAssetLog)
      setIsLoading(false)
    })()
  }, [id])

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Asset History</CardTitle>
        <CardDescription>Tracking log of all activities related to this asset</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex justify-center py-8'>
            <LoadingSpinner className='text-muted-foreground h-8 w-8 animate-pulse' />
          </div>
        ) : assetLog?.data.length === 0 ? (
          <div className='text-muted-foreground py-8 text-center'>
            <p>No history available for this asset</p>
          </div>
        ) : (
          <ScrollArea className='h-[180px] rounded-2xl border px-4 py-2'>
            <div className='space-y-4'>
              {assetLog?.data?.map((item, index) => (
                <div
                  key={index}
                  className='flex gap-4 border-b pb-4 last:border-b-0 last:pb-0'
                >
                  <LogIcon item={item} />
                  <LogInformation item={item} />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export default ViewAssetLog
