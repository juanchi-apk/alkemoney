import React, { useEffect, useState , useRef  } from 'react';

import { setAllCategories, setNewTransaction } from '../store/payloads/actions';
import { connect ,useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createUserTransaction } from '../api/transactions';
import CategoryCreate from './CategoryCreate';

import('./transactionCreate.scss')

const transactionForm = {
    isIncome:true,
    isOutcome:false,
    amount:"",
    category: "",
    details: "",
}

function TransactionCreate({
    userData,
    onGetCategories,
    errors,
    categories,
}) {

    const stateUser = useSelector(state => state.authData);
    const [tranFormErrors, setTranFormErrors] = useState(false);
    const [transactionData, settransactionData] = useState(transactionForm)
    const dispatch = useDispatch();
/*     const [userData, setUserData] = useState(stateUser)
 */    

    const [transactionType, setTransactionType] = useState( {
        income:true,
        outcome:false,
    });
  


    

    const  handleFormChanges =  (event) =>{
        event.preventDefault();
        console.log(event.target)
        if(event.target.type==="radio"){
           
            settransactionData({...transactionData, isIncome :!transactionData.isIncome, isOutcome:!transactionData.isOutcome})
        }else{

            settransactionData({...transactionData, [event.target.name] : event.target.value})
         
        }

       
    }

    useEffect(() => {
        onGetCategories()
    }, [onGetCategories])


    async function handleCreateTransaction(event) {
      event.preventDefault()
      console.log(transactionData);
       const response = await createUserTransaction(userData, transactionData)
        console.log(response)
        dispatch(setNewTransaction(response))
        window.location.reload(false)
       /* let TransactionData : {

       }; */
/*        
const newTransaction = await () 


 */       
    }
/* 


*/
    return (
      
            <div className=" mx-auto formBackground">
                <form className='formFields ' onSubmit={handleCreateTransaction}>
                    <div className="form-group row col-sm-12 mx-auto text-center">
                        Select type of transaction
                    </div>
                    <div className="form-group row col-sm-12 mx-auto"> 
                        <div className="form-check form-check-inline col-sm-5 mx-auto">
                            <input className="form-check-input" type="radio" name="isIncome" id="flexRadioDefault1" onChange={handleFormChanges}  checked = {transactionData.isIncome} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Incomes
                            </label>
                        </div>
                        <div className="form-check form-check-inline col-sm-5 mx-auto">
                            <input className="form-check-input" type="radio" name="isOutcome" id="flexRadioDefault2" onChange={handleFormChanges}  focus={transactionData.isOutcome.toString()} checked={transactionData.isOutcome}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Outcomes
                            </label>
                        </div>
                     </div>
                    <div className="form-group row col-sm-12 mx-auto">
                        <label htmlFor="inputAmount" className="col-sm-3 col-form-label">Amount</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control " name="amount" id="amount" placeholder="Insert the amount, separated by ','" onChange={handleFormChanges}/>
                        </div>
                    </div>
                    <div className="form-group row col-sm-12 mx-auto">
                    <label htmlFor="inputAmount" className="col-sm-3 col-form-label">Category</label>
                    <div className="col-sm-9">

                    <select className="form-select" name='category' aria-label="Default select example" onChange={handleFormChanges}>
                        <option defaultValue>Select your category</option>
                        { categories!==null && categories.map(category => {
                               return( 
                                      <option key={category.cat_id} name='category' value={category.cat_id}  >
                                        {category.cat_name}
                                      </option> 
                                        )                  
                        })
                    }
                    
                    </select>
                    </div>
                    </div>
                    <CategoryCreate/>
                    <div className="form-group row col-sm-12 mx-auto">
                        <label htmlFor="inputDetails" className="col-sm-3 col-form-label">Details</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control " name="details" id="inputDetails" placeholder="If you like describe some details about the operation" onChange={handleFormChanges}/>
                        </div>
                    </div>

                    {tranFormErrors && (
                        console.log(errors)
                       /*  errors.errors.map(function (element) {
                            console.log(element);
                            return (
                                <div className="form-group row col-sm-12 mx-auto">
                                    <p><small className="text-center errors" >{element.msg}</small></p>

                                </div>
                            )
                        }) */
                    )}
                    <div className="form-group row mx-auto">
                        <div className="offset-sm-2 col-sm-10">
                            <button type="submit" className="btn btn-primary" >Action</button>
                        </div>
                    </div>
                </form>
            </div>
     

    )
}

const mapStateToProps = (state) => {

    return {
        user: state.user,
        mail: state.mail,
        password: state.password,
        errors: state.errors,
        name: state.name,
        lastname: state.lastname,
        categories: state.categories,


    }
}


function mapDispatchToProps(dispatch) {
    return {
        onDetailChange: function (description) {
            console.log(description)
        },
        onAmountChange: function (float) {
            console.log(float)
        },
        onGetCategories: async function () {

            const response = await axios.get(`http://localhost:3001/categories/`)
            dispatch(setAllCategories(response.data.data.categories))
        }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionCreate);
