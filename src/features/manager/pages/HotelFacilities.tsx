import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'
import { managerApi, type FacilityResponse, type HotelFacilityResponse } from '../api/managerApi'

const FACILITY_VALUES = ['FREE', 'PAID', 'AVAILABLE'] as const

export function HotelFacilities() {
  const { id } = useParams()
  const hotelId = Number(id)
  const [facilities, setFacilities] = useState<FacilityResponse[]>([])
  const [selected, setSelected] = useState<Record<number, string>>({})
  const [isSaving, setIsSaving] = useState(false)

  const facilityRows = useMemo(
    () =>
      facilities.map((facility) => ({
        ...facility,
        value: selected[facility.id] || 'AVAILABLE',
      })),
    [facilities, selected],
  )

  useEffect(() => {
    if (!hotelId || Number.isNaN(hotelId)) return

    const load = async () => {
      try {
        const [catalog, existing] = await Promise.all([
          managerApi.listFacilities(),
          managerApi.getHotelFacilities(hotelId),
        ])
        setFacilities(catalog)
        const mapped = (existing || []).reduce<Record<number, string>>((acc, item) => {
          acc[item.facilityId] = item.value
          return acc
        }, {})
        setSelected(mapped)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load facilities.'
        toast.error(message)
      }
    }

    load()
  }, [hotelId])

  const handleSave = async () => {
    if (!hotelId || Number.isNaN(hotelId)) return

    try {
      setIsSaving(true)
      await managerApi.upsertHotelFacilities(hotelId, {
        facilities: facilityRows.map((facility) => ({
          facilityId: facility.id,
          value: facility.value as HotelFacilityResponse['value'],
        })),
      })
      toast.success('Facilities updated.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Update failed.'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-4xl mx-auto">
        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Hotel Facilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {facilityRows.length === 0 ? (
              <p className="text-cyan-100/60">No facilities available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilityRows.map((facility) => (
                  <div
                    key={facility.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/30 p-4"
                  >
                    <div>
                      <p className="text-white font-semibold">{facility.name}</p>
                      <p className="text-xs text-cyan-100/60">{facility.category}</p>
                    </div>
                    <Select
                      value={facility.value}
                      onValueChange={(value) =>
                        setSelected((prev) => ({ ...prev, [facility.id]: value }))
                      }
                    >
                      <SelectTrigger className="w-[150px] bg-black/40 border-white/10 text-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="glass border-white/10 dark">
                        {FACILITY_VALUES.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={handleSave}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Facilities'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
