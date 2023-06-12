import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubredditPosts = createAsyncThunk(
    'reddit/fetchSubredditPosts',
    async (subreddit) => {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`)
        const json = await response.json()

        return json.data.children.map((post) => post.data)
    }
);

export const fetchSearchResults = createAsyncThunk(
    'reddit/fetchSearchResults',
    async (searchTerm) => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
        const json = await response.json();

        return json.data.children.map((post) => post.data);
    }
);

const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        searchTerm: '',
        currentSubreddit: 'pics',
    },
    reducers: {
        setCurrentSubreddit: (state, action) => {
            state.currentSubreddit = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setComments: (state, action) => {
            state.comments = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSubredditPosts.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(fetchSubredditPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.posts = action.payload;
        })
        builder.addCase(fetchSubredditPosts.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        builder.addCase(fetchSearchResults.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.posts = action.payload;
            state.currentSubreddit = '';
            state.searchTerm = '';
        })
        builder.addCase(fetchSearchResults.rejected, (state) => {
            state.isLoading = false;
            state.hasError = false;
        })
    }
})

export const {
    setCurrentSubreddit,
    setPosts,
    setSearchTerm,
} = redditSlice.actions;


export default redditSlice.reducer;
