import {CHANGE_USER, 
        CHANGE_EMAIL,
        CHANGE_PASSWORD,
        CHANGE_NAME,
        CHANGE_LASTNAME,
        SET_ERROR,
        SET_CAT_NAME,
        SET_ALL_CAT,
        AUTH,
        LOGOUT,
        SIGNUP,
        SIGNIN,
        SET_TRANSACTIONS,
        NEW_TRANSACTION,
     
       
    } from '../actions/actionTypes';


const initialState = {
    
    user:"",
    name:"",
    lastname:"",
    mail:"",
    password:"",
    errors: undefined,
    catname:"",
    categories:null,
    authData : null,
    transactions:[] ,
    outcomes: 0,
    incomes: 0,
    balance: 0,
   

    
}

export function rootReducer(state = initialState,  action) {
    switch (action.type) {
            case CHANGE_USER: 
            return {
                ...state,
                user: action.payload.user
            }
            case CHANGE_EMAIL: 
            return {
                ...state,
                mail : action.payload.mail
            }
            case CHANGE_PASSWORD: 
            return {
                ...state,
                password : action.payload.password
            } 
            case SET_ERROR: 
            console.log(action.payload)
            return {
                ...state,
                errors : action.payload.errors
            }
            case CHANGE_NAME: 
            return {
                ...state,
                name : action.payload.name
            }
            case CHANGE_LASTNAME: 
            return {
                ...state,
                lastname : action.payload.lastname
            }
            case SET_CAT_NAME: 
            return {
                ...state,
                catname : action.payload.catname,
            }
            case AUTH: 
                
                return {
                    ...state,
                    authData: action.payload,
            }
            case LOGOUT: 
            
            localStorage.clear("reduxState");

            
            return {
             ...initialState
            }
            case SET_TRANSACTIONS:  
           /*   let allTransactionArray=[];
                action.payload.transactions.forEach(transaction => {
               
                    allTransactionArray.push(transaction)})

           
            console.log(allTransactionArray) */
            return {
                ...state,
                transactions: action.payload.transactions.allTransactions,
                balance: action.payload.transactions.balance,
                incomes: action.payload.transactions.incomes,
                outcomes: action.payload.transactions.outcomes,

                
            }
            case NEW_TRANSACTION:
              
               
                return{
                    ...state,
                    transactions:state.transactions.concat(action.payload.transactions)
                   
                    

                }
            
            case SET_ALL_CAT: 
            return {
                ...state,
                categories : action.payload.categories,
            }

            case SIGNIN:

                return {
                    ...state,
                    authData: action.payload,
                }
                case SIGNUP:

                return {
                    ...state,
                    authData: action.payload,
                }

               
            
            default:
            return state;
   }
}