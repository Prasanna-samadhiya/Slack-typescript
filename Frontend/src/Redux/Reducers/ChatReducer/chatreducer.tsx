import { createSlice, current} from "@reduxjs/toolkit"
// Define a type for the slice state
interface Initialstate {
    chatname:string;
  }

const initialState:Initialstate={
    chatname:""
    };

const ChatSlice = createSlice({
    name: 'chat',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      chatclicked(state,action){
        state.chatname=action.payload.name;
        console.log(current(state))
        return state;
      }
    }
  })

export const { chatclicked} = ChatSlice.actions;

export default ChatSlice.reducer