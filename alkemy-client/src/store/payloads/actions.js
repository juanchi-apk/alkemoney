import {SET_ERROR,
        SET_CAT_NAME,
        SET_ALL_CAT,
        AUTH,
        LOGOUT,
        SIGNUP,
        SIGNIN,
        SET_TRANSACTIONS,
        NEW_TRANSACTION,
        SET_INCOMES,
        SET_OUTCOMES,
        SET_BALANCE

    }
from '../actions/actionTypes';





export function setError(errors){
  
    return {type: SET_ERROR, payload: {errors: errors.errors}}
}



export function setCatName(catname){
    return {type: SET_CAT_NAME, payload: { catname } };
}

export function setAllCategories(categories){
    return {type: SET_ALL_CAT, payload: { categories } };
}

export function onAuth(result, token){
    return {type: AUTH, payload: { result, token } };
}
export function onLogout(){
    return {type: LOGOUT };
}

export  function onSignUp(result, token){
    return {type: SIGNUP, payload: { result, token }}
}

export function onSignIn(result, token){       
    return {type: SIGNIN, payload: { result, token } };
}

export function onSetUserTransactions(data){
    
   console.log(data)
     return {type: SET_TRANSACTIONS, payload: { transactions: data?.userTransactions} };
   
    
}




export function setNewTransaction(data){
return {type: NEW_TRANSACTION, payload:{ transactions: data.data.transaction}}

}







