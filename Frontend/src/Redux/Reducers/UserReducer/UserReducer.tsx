import { createSlice} from "@reduxjs/toolkit"

interface Workspace{
   workspace:string;
   workspacedescription:string;
}
// Define a type for the slice state
interface Initialstate {
    details:{name:string;email:string;}|undefined
    isloggedin:boolean;
    workspaces:Workspace[];
    ison:string;
  }

const initialState:Initialstate={
    details:{name:"",email:""},
    isloggedin:false,
    workspaces:[],
    ison:""
    };

const UserSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      loggedinSuccess(state,action){
        state.isloggedin=true;
        state.details=action.payload;
        console.log(state.details);
        return state;
      },
      loggedoutSuccess(state){
        state.isloggedin=false;
        state.details=undefined;
        console.log(state.isloggedin);
        return state;
      },
      // addworkspace(){
        
      // },
      // selectworkspace(state,action){
      //   const workspace=action.payload
      //   state.workspaces.map((ele)=>{
      //     if(ele.workspace==workspace){
      //       state.ison=workspace
      //     }
      //   })
      //   console.log(state.ison)
      //   return state;
      // }
    }
  })

export const { loggedinSuccess,loggedoutSuccess} = UserSlice.actions;

export default UserSlice.reducer