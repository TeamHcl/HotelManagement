import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'
import { managerApi } from '../api/managerApi'

export function RoomTypeEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [form, setForm] = useState({ hotelId: '', name: '', capacity: '', basePrice: '' })

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setIsLoading(false)
      return
    }

    let isMounted = true
    managerApi
      .getRoomTypeById(Number(id))
      .then((room) => {
        if (!isMounted) return
        setForm({
          hotelId: room.hotelId.toString(),
          name: room.name,
          capacity: room.capacity.toString(),
          basePrice: room.basePrice.toString(),
        })
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load room type.'
        toast.error(message)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!id || isNaN(Number(id))) return

    try {
      setIsSaving(true)
      await managerApi.updateRoomType(Number(id), {
        hotelId: Number(form.hotelId),
        name: form.name.trim(),
        capacity: Number(form.capacity),
        basePrice: Number(form.basePrice),
      })
      toast.success('Room type updated.')
      navigate('/manager/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Update failed.'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id || isNaN(Number(id))) return
    if (!window.confirm('Delete this room type?')) return

    try {
      setIsSaving(true)
      await managerApi.deleteRoomType(Number(id))
      toast.success('Room type deleted.')
      navigate('/manager/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Delete failed.'
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
            <CardTitle className="text-3xl text-white">Edit Room Type</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="room-hotelId">
                  Hotel ID
                </Label>
                <Input
                  id="room-hotelId"
                  value={form.hotelId}
                  onChange={(event) => setForm({ ...form, hotelId: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  placeholder="1"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="room-name">
                  Room Name
                </Label>
                <Input
                  id="room-name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="room-capacity">
                  Capacity
                </Label>
                <Input
                  id="room-capacity"
                  type="number"
                  value={form.capacity}
                  onChange={(event) => setForm({ ...form, capacity: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="room-price">
                  Base Price
                </Label>
                <Input
                  id="room-price"
                  type="number"
                  value={form.basePrice}
                  onChange={(event) => setForm({ ...form, basePrice: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                  disabled={isSaving || isLoading}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={handleDelete}
                  disabled={isSaving || isLoading}
                >
                  Delete Room Type
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
