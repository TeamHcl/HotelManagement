import { useEffect, useState, type FormEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'
import { userApi } from '../api/userApi'

export function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '' })

  useEffect(() => {
    let isMounted = true
    userApi
      .getProfile()
      .then((profile) => {
        if (!isMounted) return
        setForm({ name: profile.name, email: profile.email })
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load profile.'
        toast.error(message)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSaving) return

    try {
      setIsSaving(true)
      const updated = await userApi.updateProfile({
        name: form.name.trim(),
        email: form.email.trim(),
      })
      setForm({ name: updated.name, email: updated.email })
      toast.success('Profile updated.')
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
            <CardTitle className="text-3xl text-white">My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label className="text-white" htmlFor="profile-name">
                  Full Name
                </Label>
                <Input
                  id="profile-name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  placeholder="Your name"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white" htmlFor="profile-email">
                  Email
                </Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="bg-black/40 border-white/10 text-white"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
                disabled={isLoading || isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
