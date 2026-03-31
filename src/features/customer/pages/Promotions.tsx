import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { promotionApi, type PromotionResponse } from '../api/promotionApi'
import { toast } from 'sonner'

export function Promotions() {
  const [promotions, setPromotions] = useState<PromotionResponse[]>([])

  useEffect(() => {
    promotionApi
      .listActive()
      .then(setPromotions)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load promotions.'
        toast.error(message)
      })
  }, [])

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-5xl mx-auto">
        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Active Promotions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {promotions.length === 0 ? (
              <p className="text-cyan-100/60">No active promotions.</p>
            ) : (
              promotions.map((promo) => (
                <div
                  key={promo.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <div>
                    <p className="text-white font-semibold">{promo.code}</p>
                    <p className="text-xs text-cyan-100/60">
                      {promo.type} • Min ${promo.minBookingAmount} • Max ${promo.maxDiscount}
                    </p>
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-500/30 w-max">
                    {promo.value}{promo.type === 'PERCENTAGE' ? '%' : ''} off
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
