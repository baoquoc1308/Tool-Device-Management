import { Avatar, AvatarImage, AvatarFallback, Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import type { ComparisonAsset, ComparisonField } from '../model'
import { Info } from 'lucide-react'

interface ComparisonTableProps {
  assets: ComparisonAsset[]
}

export const ComparisonTable = ({ assets }: ComparisonTableProps) => {
  if (assets.length === 0) {
    return (
      <Card>
        <CardContent className='p-8 text-center'>
          <p className='text-muted-foreground'>Select assets to start comparison</p>
        </CardContent>
      </Card>
    )
  }

  const comparisonFields: ComparisonField[] = [
    { key: 'imageUpload', label: 'Image', type: 'image', group: 'basic' },
    { key: 'assetName', label: 'Asset Name', type: 'text', group: 'basic' },
    { key: 'serialNumber', label: 'Serial Number', type: 'text', group: 'basic' },
    { key: 'category.categoryName', label: 'Category', type: 'text', group: 'basic' },
    { key: 'cost', label: 'Cost', type: 'currency', group: 'basic' },
    { key: 'purchaseDate', label: 'Purchase Date', type: 'date', group: 'basic' },
    { key: 'warrantExpiry', label: 'Warranty Expiry', type: 'date', group: 'basic' },
    { key: 'department.departmentName', label: 'Department', type: 'text', group: 'basic' },
    { key: 'location.locationAddress', label: 'Location', type: 'text', group: 'basic' },
    { key: 'status', label: 'Status', type: 'badge', group: 'basic' },
  ]

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  const renderFieldValue = (asset: ComparisonAsset, field: ComparisonField) => {
    const value = getNestedValue(asset, field.key)

    switch (field.type) {
      case 'image':
        return (
          <Avatar className='mx-auto h-16 w-16'>
            <AvatarImage src={value} />
            <AvatarFallback>{asset.assetName[0]}</AvatarFallback>
          </Avatar>
        )
      case 'currency':
        return <span className='font-medium'>${value?.toLocaleString() || '0'}</span>
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '-'
      case 'badge':
        const getStatusVariant = (status: string) => {
          switch (status?.toLowerCase()) {
            case 'new':
              return 'default'
            case 'in use':
              return 'secondary'
            case 'maintenance':
              return 'destructive'
            case 'retired':
              return 'outline'
            default:
              return 'secondary'
          }
        }
        return <Badge variant={getStatusVariant(value)}>{value || '-'}</Badge>
      default:
        return <span>{value || '-'}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Info className='h-5 w-5' />
          Asset Information
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='comparison-table-container overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='comparison-table-header bg-muted/50 border-b'>
                <th className='bg-muted/50 sticky left-0 z-20 w-48 p-4 text-left font-medium shadow-sm'>Property</th>
                {assets.map((asset) => (
                  <th
                    key={asset.id}
                    className='border-border min-w-56 border-l p-4 text-center'
                  >
                    <div className='font-medium'>{asset.assetName}</div>
                    <div className='text-muted-foreground text-sm'>{asset.serialNumber}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field) => (
                <tr
                  key={field.key}
                  className='hover:bg-muted/25 border-b'
                >
                  <td className='bg-background sticky left-0 z-10 border-r p-4 font-medium shadow-sm'>{field.label}</td>
                  {assets.map((asset, index) => (
                    <td
                      key={`${asset.id}-${field.key}`}
                      className={`border-border border-l p-4 text-center ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
                    >
                      {renderFieldValue(asset, field)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
