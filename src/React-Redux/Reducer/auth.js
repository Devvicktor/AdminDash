import {LOG_IN,LOG_OUT} from '../Action-types/actionTypes'

const initialState={
    user:null,
    login:(userData)=>{},
    logout:()=>{}
};
export default (state=initialState,action)=>{
  switch (action.type) {
    case LOG_IN:
          return{
              ...state,
              user:action.payload
          };
        case LOG_OUT:
          return{
              ...state,
              user:null
          }

      default:
          return state;
  }
}