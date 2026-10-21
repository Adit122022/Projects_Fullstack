import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { JobPosting } from '@/domain/entities'
import { CareersRepository } from '@/infrastructure/repositories/CareersRepository'

export interface CareersState {
  searchQuery: string
  selectedDepartment: string
  jobs: JobPosting[]
  selectedJobId: string | null
  applicationStatus: 'idle' | 'submitted'
}

const initialState: CareersState = {
  searchQuery: '',
  selectedDepartment: 'All',
  jobs: CareersRepository.getAllJobs(),
  selectedJobId: null,
  applicationStatus: 'idle',
}

export const careersSlice = createSlice({
  name: 'careers',
  initialState,
  reducers: {
    setCareersSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSelectedDepartment: (state, action: PayloadAction<string>) => {
      state.selectedDepartment = action.payload
    },
    selectJob: (state, action: PayloadAction<string | null>) => {
      state.selectedJobId = action.payload
      state.applicationStatus = 'idle'
    },
    submitDemoApplication: (state) => {
      state.applicationStatus = 'submitted'
    },
    resetCareersFilters: (state) => {
      state.searchQuery = ''
      state.selectedDepartment = 'All'
    },
  },
})

export const {
  setCareersSearchQuery,
  setSelectedDepartment,
  selectJob,
  submitDemoApplication,
  resetCareersFilters,
} = careersSlice.actions

export default careersSlice.reducer
