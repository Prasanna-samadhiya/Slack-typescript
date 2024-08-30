import { createSlice, current } from "@reduxjs/toolkit";

interface InitialState{
     wname:string;
     wadmin:string;
     members:string[];
     genchats:string[];
     pchats:string[];
     chatname:string[];
     chatdes:string[];
}

const initialState:InitialState={
    wname:"",
    wadmin:"",
    members:[],
    genchats:[],
    pchats:[],
    chatname:[],
    chatdes:[]
}

const WorkspaceSlice=createSlice({
    name:"workspace",
    initialState,
    reducers:{
         Workspaceselected(state,action){
             console.log(action.payload)
             state.wname=action.payload.wname;
             state.wadmin=action.payload.wadmin;
             state.members=action.payload.members;
             state.genchats=action.payload.genchats;
             state.pchats=action.payload.pchats;
             state.chatname=action.payload.chatname;
             state.chatdes=action.payload.chatdes;
             console.log(current(state))
             return state
         },
         Generalchatadded(state,action){
            console.log(action.payload);
            state.genchats.push(action.payload);
            return state;
         },Privatechatadded(state,action){
            console.log(action.payload);
            state.pchats.push(action.payload);
            return state;
         }
    }
   })

export const {Workspaceselected,Generalchatadded,Privatechatadded}=WorkspaceSlice.actions

export default WorkspaceSlice.reducer;