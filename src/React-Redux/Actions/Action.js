import {LOG_IN,LOG_OUT} from '../Action-types/actionTypes'


export const Login=(userData)=>({
    type:LOG_IN,
    payload:userData
    
});
export const Logout=()=>({
    type:LOG_OUT,
  
})