import React, { useState } from 'react'
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Mail,
  Sparkles,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import {
  setCareersSearchQuery,
  setSelectedDepartment,
  selectJob,
  submitDemoApplication,
} from '@/application/features/careers/careersSlice'
import {
  selectFilteredJobs,
  selectAllDepartments,
  selectActiveJob,
} from '@/application/selectors/careersSelectors'
import { APP_CONFIG } from '@/infrastructure/config/appConfig'
import { Dialog } from '@/presentation/ui/Dialog'
import { Button } from '@/presentation/ui/Button'
import { Badge } from '@/presentation/ui/Badge'
import { Input } from '@/presentation/ui/Input'
import { cn } from '@/shared/utils/cn'

export const CareersPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const filteredJobs = useAppSelector(selectFilteredJobs)
  const departments = selectAllDepartments()
  const activeJob = useAppSelector(selectActiveJob)
  const searchQuery = useAppSelector((state) => state.careers.searchQuery)
  const selectedDepartment = useAppSelector(
    (state) => state.careers.selectedDepartment
  )
  const applicationStatus = useAppSelector(
    (state) => state.careers.applicationStatus
  )

  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [applicantLinkedIn, setApplicantLinkedIn] = useState('')

  const handleOpenJob = (id: string) => {
    dispatch(selectJob(id))
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(submitDemoApplication())
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Careers Hero */}
      <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-[#F3F8FF] to-white border-b border-gray-100 text-center overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16">
          <Badge variant="primary" size="md" className="mb-4">
            Careers at Fairdeal
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111827] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Shape the Future of <br />
            <span className="text-[#2959A3]">B2B Quick Commerce in India.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#3F3F3F] mt-4 max-w-2xl mx-auto leading-relaxed">
            We're moving fast, solving hard logistical problems, and building something that genuinely
            matters for millions of shop owners across Bharat. If that excites you, there’s a place for you here.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 p-3 px-5 rounded-2xl bg-[#363E51] text-white text-sm font-semibold shadow-md">
            <span>Direct resume submissions:</span>
            <a
              href={`mailto:${APP_CONFIG.careersEmail}`}
              className="font-bold text-[#63C7ED] hover:underline"
            >
              {APP_CONFIG.careersEmail}
            </a>
          </div>
        </div>
      </section>

      {/* Search & Department Filters */}
      <section className="w-full py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Department Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
              {departments.map((dept) => {
                const isSelected = selectedDepartment === dept
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => dispatch(setSelectedDepartment(dept))}
                    className={cn(
                      'px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer',
                      isSelected
                        ? 'bg-[#2959A3] text-white shadow-xs'
                        : 'bg-[#F1F5F9] text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {dept}
                  </button>
                )
              })}
            </div>

            {/* Keyword Search Input */}
            <div className="w-full md:w-72 shrink-0">
              <Input
                placeholder="Search openings..."
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                value={searchQuery}
                onChange={(e) => dispatch(setCareersSearchQuery(e.target.value))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Listing Grid */}
      <section className="w-full py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
              Open Positions ({filteredJobs.length})
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              Location: Gurugram HQ & Regional Hubs
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border border-gray-200 text-center flex flex-col items-center">
              <Briefcase className="w-12 h-12 text-gray-300 mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">
                No matching roles found
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mb-4">
                Try searching for another keyword or department, or email your resume directly to careers@fairdeal.market.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  dispatch(setCareersSearchQuery(''))
                  dispatch(setSelectedDepartment('All'))
                }}
              >
                Reset Search Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-6 rounded-3xl bg-white border border-gray-200/80 hover:border-[#2959A3]/50 hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="primary" size="sm">
                        {job.department}
                      </Badge>
                      <span className="text-[11px] font-semibold text-gray-400">
                        {job.postedDate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#111827] leading-snug">
                      {job.title}
                    </h3>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {job.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col text-[11px] text-gray-500 gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenJob(job.id)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      View Role
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Role Details Modal Dialog */}
      <Dialog
        isOpen={Boolean(activeJob)}
        onClose={() => dispatch(selectJob(null))}
        title={activeJob?.title}
        description={`${activeJob?.department} • ${activeJob?.location} • ${activeJob?.experience}`}
      >
        {activeJob && (
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Role Overview
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {activeJob.overview}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2959A3] mb-2.5">
                Key Responsibilities
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600 list-disc pl-4 leading-relaxed">
                {activeJob.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2959A3] mb-2.5">
                Requirements & Qualifications
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600 list-disc pl-4 leading-relaxed">
                {activeJob.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Simulated Demo Application Form */}
            <div className="pt-4 border-t border-gray-100">
              {applicationStatus === 'submitted' ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-2" />
                  <p className="text-sm font-bold text-emerald-900">
                    Application Simulated Successfully!
                  </p>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your interest has been logged for this prototype role. In production, applications route to {APP_CONFIG.careersEmail}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Quick Demo Application
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      placeholder="Your Full Name"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                    />
                    <Input
                      placeholder="Email Address"
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="LinkedIn Profile URL or Portfolio"
                    value={applicantLinkedIn}
                    onChange={(e) => setApplicantLinkedIn(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full font-bold mt-1"
                  >
                    Submit Prototype Application
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
