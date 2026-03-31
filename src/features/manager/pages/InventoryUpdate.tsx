import { useState, type FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'
import { managerApi } from '../api/managerApi'

export function InventoryUpdate() {
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({ roomTypeId: '', date: '', totalRooms: '' })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setIsSaving(true)
      await managerApi.updateInventory({
        roomTypeId: Number(form.roomTypeId),
        date: form.date,
        totalRooms: Number(form.totalRooms),
      })
      toast.success('Inventory updated.')
      setForm({ roomTypeId: '', date: '', totalRooms: '' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Update failed.'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-3xl mx-auto">
        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Single Date Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="inv-room">
                  Room Type ID
                </Label>
                <Input
                  id="inv-room"
                  value={form.roomTypeId}
                  onChange={(event) => setForm({ ...form, roomTypeId: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="inv-date">
                  Date
                </Label>
                <Input
                  id="inv-date"
                  type="date"
                  value={form.date}
                  onChange={(event) => setForm({ ...form, date: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="inv-total">
                  Total Rooms
                </Label>
                <Input
                  id="inv-total"
                  type="number"
                  value={form.totalRooms}
                  onChange={(event) => setForm({ ...form, totalRooms: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>

              <Button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Update Inventory'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
