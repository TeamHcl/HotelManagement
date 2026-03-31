import { useEffect, useState, type FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Label } from '../../../components/ui/label'
import { adminPromotionApi, type PromotionResponse } from '../api/promotionApi'
import { toast } from 'sonner'

export function AdminPromotions() {
  const [promotions, setPromotions] = useState<PromotionResponse[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({
    code: '',
    type: 'PERCENTAGE',
    value: '10',
    minBookingAmount: '0',
    maxDiscount: '0',
    startDate: '',
    endDate: '',
    usageLimit: '0',
    active: true,
  })

  useEffect(() => {
    adminPromotionApi
      .listActive()
      .then(setPromotions)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load promotions.'
        toast.error(message)
      })
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setIsSaving(true)
      const created = await adminPromotionApi.create({
        code: form.code.trim(),
        type: form.type as 'PERCENTAGE' | 'FIXED',
        value: Number(form.value),
        minBookingAmount: Number(form.minBookingAmount),
        maxDiscount: Number(form.maxDiscount),
        startDate: form.startDate,
        endDate: form.endDate,
        usageLimit: Number(form.usageLimit),
        active: form.active,
      })
      setPromotions((prev) => [created, ...prev])
      toast.success('Promotion created.')
      setForm({
        code: '',
        type: 'PERCENTAGE',
        value: '10',
        minBookingAmount: '0',
        maxDiscount: '0',
        startDate: '',
        endDate: '',
        usageLimit: '0',
        active: true,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create promotion.'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-5xl mx-auto space-y-8">
        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Create Promotion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Code</Label>
                <Input
                  value={form.code}
                  onChange={(event) => setForm({ ...form, code: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Type</Label>
                <Input
                  value={form.type}
                  onChange={(event) => setForm({ ...form, type: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Value</Label>
                <Input
                  type="number"
                  value={form.value}
                  onChange={(event) => setForm({ ...form, value: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Min Booking Amount</Label>
                <Input
                  type="number"
                  value={form.minBookingAmount}
                  onChange={(event) => setForm({ ...form, minBookingAmount: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Max Discount</Label>
                <Input
                  type="number"
                  value={form.maxDiscount}
                  onChange={(event) => setForm({ ...form, maxDiscount: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Usage Limit</Label>
                <Input
                  type="number"
                  value={form.usageLimit}
                  onChange={(event) => setForm({ ...form, usageLimit: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Start Date</Label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(event) => setForm({ ...form, startDate: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">End Date</Label>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(event) => setForm({ ...form, endDate: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Active</Label>
                <Input
                  value={form.active ? 'true' : 'false'}
                  onChange={(event) =>
                    setForm({ ...form, active: event.target.value.toLowerCase() === 'true' })
                  }
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Create Promotion'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Active Promotions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {promotions.length === 0 ? (
              <p className="text-cyan-100/60">No promotions found.</p>
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
                  <span className="text-cyan-100/80">Used {promo.usedCount}/{promo.usageLimit}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
