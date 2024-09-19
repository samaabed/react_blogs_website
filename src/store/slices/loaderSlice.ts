
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  loading: true,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
 
});




export default loaderSlice.reducer;

export const { setLoading } = loaderSlice.actions;








