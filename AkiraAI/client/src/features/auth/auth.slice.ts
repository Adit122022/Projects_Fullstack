import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState:{
        loading: null,
        error:null,
        user: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            state.error = null
            state.loading = null
        }
    }
})

export const { setLoading, setError, setUser, logout } = authSlice.actions

export default authSlice.reducer