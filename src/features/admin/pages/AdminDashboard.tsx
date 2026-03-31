import { CheckCircle2, XCircle, FileText, Search, ShieldCheck, Activity } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { motion } from 'framer-motion'

const MOCK_PENDING_DOCS = [
  {
    id: '1',
    hotel: 'Metropolitan Oasis',
    type: 'GST_CERTIFICATE',
    uploadedAt: '2023-11-04 14:30',
    status: 'PENDING',
  },
  {
    id: '2',
    hotel: 'Metropolitan Oasis',
    type: 'OWNERSHIP_PROOF',
    uploadedAt: '2023-11-04 14:45',
    status: 'PENDING',
  },
]

const MOCK_ACTIVITY = [
  { id: 'a1', log: 'New customer "Alice" registered', time: '10 mins ago' },
  { id: 'a2', log: 'Booking confirmed at The Grand Sapphire', time: '1 hour ago' },
  { id: 'a3', log: 'Manager "Marcus" logged in', time: '2 hours ago' },
]

export function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="container max-w-7xl mx-auto px-4 py-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            <ShieldCheck className="w-8 h-8 text-primary" />
            Global Admin Operations
          </h1>
          <p className="text-muted-foreground mt-1">
            Review onboarding properties, documents, and platform activity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Metric / Filters */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="glass-card border-white/10 bg-primary/5">
            <CardContent className="p-6">
              <div className="text-4xl font-black text-primary mb-2">24</div>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Pending Approvals
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search hotel..." className="pl-9 bg-white/5 border-white/10" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                System Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_ACTIVITY.map((act) => (
                <div key={act.id} className="text-xs">
                  <p className="font-medium text-foreground">{act.log}</p>
                  <p className="text-muted-foreground">{act.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="glass-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Document Verification Queue</CardTitle>
                <CardDescription>
                  Hotels cannot become ACTIVE until all mandatory documents are VERIFIED.
                </CardDescription>
              </div>
              <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/20">
                Requires Action
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-white/5 overflow-hidden">
                <Table>
                  <TableHeader className="bg-black/20">
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead>Hotel / Property</TableHead>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead className="text-right">Decision</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_PENDING_DOCS.map((doc) => (
                      <TableRow
                        key={doc.id}
                        className="border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="font-medium">{doc.hotel}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold uppercase tracking-wider">
                              {doc.type}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{doc.uploadedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 text-destructive border-destructive/30 hover:bg-destructive/20 transition-all"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
