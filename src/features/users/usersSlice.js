import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
        state.users = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.users = [];
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
// export const {} = usersSlice.actions;

export const selectAllUsers = state => state.users.users;
