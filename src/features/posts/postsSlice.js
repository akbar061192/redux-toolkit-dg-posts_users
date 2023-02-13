import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

const initialState = {
  posts: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createNewPost = createAsyncThunk('posts/createNewPost', async input => {
  try {
    const response = await axios.post(BASE_URL, input);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    newPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, body, userId) => {
        console.log(title, body, userId);
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            id: Number(userId),
            date: new Date().toISOString(),
            reactions: {
              thumpsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    handleReactions: (state, action) => {
      const { reaction, postId } = action.payload;
      const matchedPost = state.posts.find(post => post.id === postId);
      if (matchedPost) {
        matchedPost.reactions[reaction]++;
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        let min = 1;
        const transformedPosts = action.payload.map(post => {
          return {
            ...post,
            id: Number(post.id),
            date: sub(new Date(), { minutes: min++ }).toISOString(),
            reactions: {
              thumpsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          };
        });
        state.posts = transformedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.posts = [];
        state.error = action.payload;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.push({
          ...action.payload,
          id: Number(action.payload.userId),
          date: new Date().toISOString(),
          reactions: {
            thumpsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        });
      });
  },
});

export default postSlice.reducer;
export const { newPost, handleReactions } = postSlice.actions;

export const selectAllPosts = state => state.posts.posts;
export const getPostsStatus = state => state.posts.status;
export const getPostsError = state => state.posts.error;
