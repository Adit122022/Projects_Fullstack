import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { PartnerInquiry } from '@/domain/entities'
import type { SubmissionStatus } from '@/domain/types'
import { PartnerRepository } from '@/infrastructure/repositories/PartnerRepository'

export interface BrandPartnerState {
  status: SubmissionStatus
  feedbackMessage: string | null
  lastSubmission: PartnerInquiry | null
}

const initialState: BrandPartnerState = {
  status: 'idle',
  feedbackMessage: null,
  lastSubmission: null,
}

export const submitPartnerInquiry = createAsyncThunk(
  'brandPartners/submitInquiry',
  async (inquiry: PartnerInquiry, { rejectWithValue }) => {
    try {
      const response = await PartnerRepository.submitInquiry(inquiry)
      return { response, inquiry }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please check form values.'
      return rejectWithValue(msg)
    }
  }
)

export const brandPartnerSlice = createSlice({
  name: 'brandPartners',
  initialState,
  reducers: {
    resetPartnerFormState: (state) => {
      state.status = 'idle'
      state.feedbackMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPartnerInquiry.pending, (state) => {
        state.status = 'loading'
        state.feedbackMessage = null
      })
      .addCase(submitPartnerInquiry.fulfilled, (state, action) => {
        state.status = 'success'
        state.feedbackMessage = action.payload.response.message
        state.lastSubmission = action.payload.inquiry
      })
      .addCase(submitPartnerInquiry.rejected, (state, action) => {
        state.status = 'error'
        state.feedbackMessage = (action.payload as string) || 'Submission failed'
      })
  },
})

export const { resetPartnerFormState } = brandPartnerSlice.actions

export default brandPartnerSlice.reducer
