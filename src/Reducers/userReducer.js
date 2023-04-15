export const initialState=null;
export const reducer=(state,action)=>{
    if(action.type==="USER"){
        return action.payload
    }else if(action.type==="ANONYMOUS"){
        return null;
    }
    else if(action.type==="UPDATEIMAGE"){
        return {
            ...state,
            profileImage:action.payload
        }
    }

        return state;
    
}