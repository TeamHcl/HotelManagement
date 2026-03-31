import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { userApi } from '../api/userApi'
import { toast } from 'sonner'

export function Loyalty() {
  const [points, setPoints] = useState<number | null>(null)

  useEffect(() => {
    userApi
      .getLoyalty()
      .then((data) => setPoints(data.loyaltyPoints))
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load loyalty.'
        toast.error(message)
      })
  }, [])

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-3xl mx-auto">
        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Loyalty Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/20 w-max">
                Luxe Elite
              </Badge>
              <div className="text-5xl font-black text-white">
                {points === null ? '---' : points}
              </div>
              <p className="text-cyan-100/60">
                Earn points with every stay and unlock premium upgrades.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
