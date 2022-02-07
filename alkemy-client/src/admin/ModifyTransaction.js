import React, { useEffect, useState , useRef  } from 'react';
import { setAllCategories, setNewTransaction } from '../store/payloads/actions';
import { connect ,useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { modifyUserTransaction } from '../api/transactions';
import CategoryCreate from './CategoryCreate';

import('./transactionCreate.scss')



function ModifyTransaction({
formData,

 onGetCategories,
    errors,
    categories,
}) {
    console.log(formData)
    const stateUser = useSelector(state => state.authData);
    const [tranFormErrors, setTranFormErrors] = useState(false);
    const [transactionData, settransactionData] = useState(
        {
            amount:formData.amount,
            category:"",
            details: formData.details,
            transactionID : formData.id_transaction,
            cat_id:formData.cat_id}
    )
    const dispatch = useDispatch();
/*     const [stateUser, setstateUser] = useState(stateUser)
 */    

    const [transactionType, setTransactionType] = useState( {
        income:true,
        outcome:false,
    });
  

const getSelectedCategory = (name) =>{
    settransactionData({...transactionData,category: name})

}   

    const  handleFormChanges =  (event) =>{
        event.preventDefault();
        
        console.log(event.target.name)
        console.log(event.target.value)
        settransactionData({...transactionData, [event.target.name] : event.target.value})
            
    }

    useEffect(() => {
       
        onGetCategories()
    }, [onGetCategories])


    async function handleModifyTransaction(event , ) {
      event.preventDefault()
   
       await modifyUserTransaction(stateUser, transactionData)
        window.location.reload(false)
          
    }
    

    

    return (
      <>
               {formData&& <form className='formFields ' onSubmit={handleModifyTransaction}>
                                      
                    <div className="form-group row col-sm-12 mx-auto">
                        <label htmlFor="inputAmount" className="col-sm-3 col-form-label">Amount</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control " name="amount" id="amount" defaultValue={transactionData.amount} placeholder="Insert the amount, separated by ','"  onChange={handleFormChanges}/> 
                        </div>
                    </div>
                    <div className="form-group row col-sm-12 mx-auto">
                    <label htmlFor="inputAmount" className="col-sm-3 col-form-label">Category</label>
                    <div className="col-sm-9">

                    <select className="form-select" name='category' aria-label="Default select example" onChange={event => (handleFormChanges(event))}>
                    
                        { categories!==null && categories.map(category => {
                            let catSelected = false;

                            if(category.cat_id === formData.cat_id){
                             
                                catSelected=true;
                            }

                               return ( 
                                      <option key={category.cat_id} selected={catSelected} name='category' defaultValue={category.cat_id}  >
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
                        <label htmlFor="inputDetails"  className="col-sm-3 col-form-label">Details</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control " defaultValue={transactionData.details} name="details" id="inputDetails" placeholder="If you like describe some details about the operation" onChange={handleFormChanges}/>
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
           
                    }
                       </>
          

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

export default connect(mapStateToProps, mapDispatchToProps)(ModifyTransaction);
