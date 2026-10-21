import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'
import { CareersRepository } from '@/infrastructure/repositories/CareersRepository'

export const selectCareersState = (state: RootState) => state.careers
export const selectCareersSearchQuery = (state: RootState) => state.careers.searchQuery
export const selectSelectedDepartment = (state: RootState) => state.careers.selectedDepartment
export const selectSelectedJobId = (state: RootState) => state.careers.selectedJobId
export const selectApplicationStatus = (state: RootState) => state.careers.applicationStatus

export const selectFilteredJobs = createSelector(
  [selectSelectedDepartment, selectCareersSearchQuery],
  (department, searchQuery) => {
    return CareersRepository.filterJobs(department, searchQuery)
  }
)

export const selectAllDepartments = () => CareersRepository.getDepartments()

export const selectActiveJob = createSelector(
  [(state: RootState) => state.careers.jobs, selectSelectedJobId],
  (jobs, selectedId) => {
    if (!selectedId) return null
    return jobs.find((j) => j.id === selectedId) || null
  }
)
