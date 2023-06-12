import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubreddits = createAsyncThunk(
    'subreddit/fetchSubreddits',
    async () => {
        const response = await fetch('https://www.reddit.com/subreddits.json');
        const json = await response.json();
        return json.data.children.map((subreddit) => subreddit.data);
    });

const subredditSlice = createSlice({
    name: 'subreddit',
    initialState: {
        subreddits: [],
        isLoading: false,
        hasError: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchSubreddits.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        builder.addCase(fetchSubreddits.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.hasError = false;
            state.subreddits = action.payload
        })
        builder.addCase(fetchSubreddits.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
    } 
});

export default subredditSlice.reducer;

export const selectTargetSubredditIcon = (state, currentSubreddit) => {
    for (let item of state.subreddits.subreddits) {
        if (item.display_name === currentSubreddit) {
            return item.icon_img
        }
    };
};

