import { useState } from 'react'
import {
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  ShieldCheck,
  Activity,
  UserPlus,
  Building,
  LogIn,
} from 'lucide-react'
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

const INITIAL_MOCK_PENDING_DOCS = [
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

const INITIAL_MOCK_ACTIVITY = [
  {
    id: 'a1',
    log: 'New customer "Alice" registered',
    time: '10 mins ago',
    icon: <UserPlus className="w-4 h-4 text-cyan-400" />,
  },
  {
    id: 'a2',
    log: 'Booking confirmed at The Grand Sapphire',
    time: '1 hour ago',
    icon: <Building className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: 'a3',
    log: 'Manager "Marcus" logged in',
    time: '2 hours ago',
    icon: <LogIn className="w-4 h-4 text-indigo-400" />,
  },
]

export function AdminDashboard() {
  const [pendingDocs, setPendingDocs] = useState(INITIAL_MOCK_PENDING_DOCS)
  const [activities, setActivities] = useState(INITIAL_MOCK_ACTIVITY)

  const handleDocumentAction = (
    id: string,
    action: 'approved' | 'rejected',
    hotelName: string,
    docType: string,
  ) => {
    // Remove from queue
    setPendingDocs((prev) => prev.filter((doc) => doc.id !== id))

    // Add to system activity
    const newActivity = {
      id: Date.now().toString(),
      log: `Document ${docType} for ${hotelName} was ${action}`,
      time: 'Just now',
      icon:
        action === 'approved' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <XCircle className="w-4 h-4 text-red-500" />
        ),
    }
    setActivities((prev) => [newActivity, ...prev])
  }
  return (
    <div className="relative min-h-screen">
      {/* Ambient Background Lighting */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/10 blur-[150px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className="container max-w-7xl mx-auto px-4 py-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-4 bg-gradient-to-r from-emerald-100 to-emerald-400 bg-clip-text text-transparent">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
              Global Admin Operations
            </h1>
            <p className="text-emerald-100/60 font-medium mt-2">
              Review onboarding properties, strictly verify documents, and monitor platform
              activity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Metric / Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 pb-6 flex flex-col gap-2 relative z-10">
                <div className="text-6xl font-black text-white mb-2 tracking-tighter">
                  {pendingDocs.length}
                </div>
                <p className="text-sm text-emerald-100/60 font-bold uppercase tracking-widest leading-tight">
                  Pending Approvals
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-5">
                <div className="relative">
                  <Search className="absolute left-4 top-3 h-5 w-5 text-emerald-100/40" />
                  <Input
                    placeholder="Search properties..."
                    className="pl-12 bg-black/40 border-white/10 text-white placeholder:text-emerald-100/30 h-12 rounded-xl focus-visible:ring-emerald-500/50"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
              <CardHeader className="pb-4 border-b border-white/5">
                <CardTitle className="text-base font-bold text-white flex items-center gap-3">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  System Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {activities.map((act) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={act.id}
                    className="flex gap-4 items-start"
                  >
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      {act.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-emerald-50 leading-snug">{act.log}</p>
                      <p className="text-xs text-emerald-100/40 font-mono">{act.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6">
                <div>
                  <CardTitle className="text-2xl text-white">Document Verification Queue</CardTitle>
                  <CardDescription className="text-emerald-100/60 text-sm mt-1">
                    Properties cannot be set to ACTIVE until all statutory documents are VERIFIED.
                  </CardDescription>
                </div>
                <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/20 px-4 py-1.5 mt-4 sm:mt-0 font-bold">
                  Requires Action
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-black/20">
                    <TableRow className="border-0 hover:bg-transparent">
                      <TableHead className="py-5 px-6 font-bold text-emerald-100/70">
                        Property
                      </TableHead>
                      <TableHead className="py-5 font-bold text-emerald-100/70">Document</TableHead>
                      <TableHead className="py-5 font-bold text-emerald-100/70">Uploaded</TableHead>
                      <TableHead className="py-5 pr-6 text-right font-bold text-emerald-100/70">
                        Decision
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingDocs.length === 0 ? (
                      <TableRow className="border-0">
                        <TableCell colSpan={4} className="h-32 text-center text-emerald-100/50">
                          No pending documents to verify.
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingDocs.map((doc) => (
                        <TableRow
                          key={doc.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                        >
                          <TableCell className="py-4 px-6 font-bold text-white text-base">
                            {doc.hotel}
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-indigo-400" />
                              </div>
                              <span className="text-xs font-bold text-indigo-100/80 uppercase tracking-widest">
                                {doc.type}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4 text-emerald-100/60 font-mono text-sm">
                            {doc.uploadedAt}
                          </TableCell>
                          <TableCell className="py-4 pr-6 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-100 sm:opacity-50 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  handleDocumentAction(doc.id, 'approved', doc.hotel, doc.type)
                                }
                                className="h-10 w-10 rounded-xl bg-black/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  handleDocumentAction(doc.id, 'rejected', doc.hotel, doc.type)
                                }
                                className="h-10 w-10 rounded-xl bg-black/40 border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all"
                              >
                                <XCircle className="w-5 h-5" />
                              </Button>
                            </div>
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
      </motion.div>
    </div>
  )
}
