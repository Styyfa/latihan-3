import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    userData: {
        user: null,
        isSuccess: false,
        isError: false,
        isLoading: false,
        message: '',
    },
    anotherData: {
        isSuccess: false,
        isError: false,
        isLoading: false,
        message: '',
        data: {
            putUser: null,
            createUser: null,
        }
    }
}

export const login = createAsyncThunk('postLoginUser', async (user, thunkApi) => {
    try {
        const res = await axios.post('http://localhost:3000/login', {
            email: user.email,
            password: user.password
        })
        return res.data
    } catch(err) {
        if(err) return thunkApi.rejectWithValue(err.message)
    }
})

export const logOut = createAsyncThunk('deleteLogOut', async (user, thunkApi) => {
    try {
        const res = await axios.delete(`http://localhost:3000/logout/${user.id}`)
        return res.data
    } catch(err) {
        if(err) return thunkApi.rejectWithValue(err.message)
    }
})

export const register = createAsyncThunk('postRegisterUser', async (user, thunkApi) => {
    try {
        const res = await axios.post('http://localhost:3000/register', {
            username: user.username,
            email: user.email,
            password: user.password,
            confPassword: user.confPassword
        })
        return res.data
    } catch(err) {
        if(err) return thunkApi.rejectWithValue(err.message)
    }
})

export const oneUser = createAsyncThunk('getOneUser', async (user, thunkApi) => {
    try {
        const response = await axios.get(`http://localhost:3000/user/${user.id}`)
        return response.data
    } catch(err) {
        if(err) return thunkApi.rejectWithValue(err.message)
    }
})

export const updateUser = createAsyncThunk('updateUser', async (user, thunkApi) => {
    try {
        const response = await axios.put(`http://localhost:3000/user/${user.id}`, {
            username: user.username
        })
        return response.data
    } catch(err) {
        if(err) return thunkApi.rejectWithValue(err.message)
    }
})

export const deleteUser = createAsyncThunk('deleteUser', async (user, thunkApi) => {
    try {
        const response = await axios.delete(`http://localhost:3000/user/${user.id}`)
        return response.data
    } catch(err) {
        if(err) return thunkApi.rejectWithValue(err.message)
    }
})

export const me = createAsyncThunk('meData', async (user, thunkApi) => {
    try {
        const res = await axios.get('http://localhost:3000/me')
        return res.data
    } catch(err) {
        if(err) return thunkApi.rejectWithValue(err.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) =>  {
        // LOGIN
        builder.addCase(login.pending, (s) => {
            s.userData.isLoading = true
        })
        builder.addCase(login.rejected, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isError = true,
            s.userData.message = action.payload
        })
        builder.addCase(login.fulfilled, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isSuccess = true,
            s.userData.user = action.payload
        })
        // LOGOUT
        builder.addCase(logOut.pending, (s) => {
            s.userData.isLoading = true
        })
        builder.addCase(logOut.rejected, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isError = true,
            s.userData.message = action.payload
        })
        builder.addCase(logOut.fulfilled, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isSuccess = true,
            s.userData.user = action.payload
        })
        // REGISTER
        builder.addCase(register.pending, (s) => {
            s.anotherData.isLoading = true
        })
        builder.addCase(register.rejected, (s, action) => {
            s.anotherData.isLoading = false,
            s.anotherData.isError = true,
            s.anotherData.message = action.payload
        })
        builder.addCase(register.fulfilled, (s, action) => {
            s.anotherData.isLoading = false,
            s.anotherData.isSuccess = true,
            s.anotherData.data.createUser = action.payload
        })
        // ME
        builder.addCase(me.pending, (s) => {
            s.userData.isLoading = true
        })
        builder.addCase(me.rejected, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isError = true,
            s.userData.message = action.payload
        })
        builder.addCase(me.fulfilled, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isSuccess = true,
            s.userData.user = action.payload
        })
        // GET ONE USER
        builder.addCase(oneUser.pending, (s) => {
            s.userData.isLoading = true
        })
        builder.addCase(oneUser.rejected, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isError = true,
            s.userData.message = action.payload
        })
        builder.addCase(oneUser.fulfilled, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isSuccess = true,
            s.userData.user = action.payload
        })
        // UPDATE USER
        builder.addCase(updateUser.pending, (s) => {
            s.anotherData.isLoading = true
        })
        builder.addCase(updateUser.rejected, (s, action) => {
            s.anotherData.isLoading = false,
            s.anotherData.isError = true,
            s.anotherData.message = action.payload
        })
        builder.addCase(updateUser.fulfilled, (s, action) => {
            s.anotherData.isLoading = false,
            s.anotherData.isSuccess = true,
            s.anotherData.data.putUser = action.payload
        })
         // DELETE USER
         builder.addCase(deleteUser.pending, (s) => {
            s.userData.isLoading = true
        })
        builder.addCase(deleteUser.rejected, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isError = true,
            s.userData.message = action.payload
        })
        builder.addCase(deleteUser.fulfilled, (s, action) => {
            s.userData.isLoading = false,
            s.userData.isSuccess = true,
            s.userData.user = action.payload
        })
    }
})

export const {reset} = authSlice.actions 
export default authSlice.reducer