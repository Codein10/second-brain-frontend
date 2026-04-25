import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Define the async thunk for POST request
export const createPost = createAsyncThunk(
  'posts/createPost',               // action name
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetch(BACKEND_URL + '/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      return data;                  // becomes action.payload on success

    } catch (error) {
      return rejectWithValue(error.message);  // passes error to rejected case
    }
  }
);

// 2. Create the slice
const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);   // add new post to list
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;       // error message from rejectWithValue
      });
  },
});

export default postSlice.reducer;