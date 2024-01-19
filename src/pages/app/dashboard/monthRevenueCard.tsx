import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenueAmount } from '@/api/getMonthRevenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metricCardSkeleton'

export function MonthRevenueCard() {
  const { data: monthRevenueOrders } = useQuery({
    queryFn: getMonthRevenueAmount,
    queryKey: ['metrics', 'month-revenue-orders'],
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenueOrders ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenueOrders.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenueOrders.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenueOrders.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    -{monthRevenueOrders.diffFromLastMonth * -1}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
