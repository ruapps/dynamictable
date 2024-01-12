import {createSlice} from '@reduxjs/toolkit';

const tableSlice = createSlice({
    name: "table",
    initializer: {data: [], dataToUpdate:null},
    reducers: {
        addItems: (state, action) => {
            if(action.payload.id == null){
                action.payload.created= new Date().toLocaleDateString();
                action.payload.id= new Date().getTime().toString();
                state.data = [...state.data, action.payload];
            }else{
                action.payload.lastupdate= new Date().toLocaleDateString();
                const updatedData = state.data.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
                state.data = updatedData;
            }
        },
        delItems: (state, action) => {
            state.data = state.data?.filter(item => item.id != action.payload);
        },
        editItems: (state, action) => {
            state.dataToUpdate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
          .addDefaultCase((state) => !state? state = {data: [], dataToUpdate:null} : state)
      },
});

export const { addItems, delItems, editItems } = tableSlice.actions;
export default tableSlice.reducer;
