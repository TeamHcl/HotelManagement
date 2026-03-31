import { useEffect, useState, type FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'
import { managerApi } from '../api/managerApi'

export function HotelEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', description: '' })

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setIsLoading(false)
      return
    }

    let isMounted = true
    managerApi
      .getHotelById(Number(id))
      .then((hotel) => {
        if (!isMounted) return
        setForm({
          name: hotel.name,
          location: hotel.location,
          description: hotel.description || '',
        })
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load hotel.'
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
      await managerApi.updateHotel(Number(id), {
        name: form.name.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
      })
      toast.success('Hotel updated.')
      navigate('/manager/dashboard')
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
            <CardTitle className="text-3xl text-white">Edit Hotel</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="hotel-name">
                  Name
                </Label>
                <Input
                  id="hotel-name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="hotel-location">
                  Location
                </Label>
                <Input
                  id="hotel-location"
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="hotel-description">
                  Description
                </Label>
                <Textarea
                  id="hotel-description"
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  className="bg-black/40 border-white/10 text-white min-h-[120px]"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                disabled={isLoading || isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Hotel'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
