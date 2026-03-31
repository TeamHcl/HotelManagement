import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Badge } from '../../../components/ui/badge'
import { customerApi, type FacilityResponse } from '../api/customerApi'
import { toast } from 'sonner'

export function FacilitiesCatalog() {
  const [facilities, setFacilities] = useState<FacilityResponse[]>([])

  useEffect(() => {
    customerApi
      .getFacilities()
      .then(setFacilities)
      .catch((err) => {
        const message = err instanceof Error ? err.message : 'Failed to load facilities.'
        toast.error(message)
      })
  }, [])

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="container max-w-5xl mx-auto">
        <Card className="border-0 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Facilities Catalog</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-black/20">
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead className="py-5 px-6 font-bold text-cyan-100/70">Name</TableHead>
                  <TableHead className="py-5 font-bold text-cyan-100/70">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilities.length === 0 ? (
                  <TableRow className="border-0">
                    <TableCell colSpan={2} className="h-24 text-center text-cyan-100/60">
                      No facilities available.
                    </TableCell>
                  </TableRow>
                ) : (
                  facilities.map((facility) => (
                    <TableRow
                      key={facility.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <TableCell className="py-4 px-6 text-white font-medium">
                        {facility.name}
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="border-white/10 text-cyan-200">
                          {facility.category}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
