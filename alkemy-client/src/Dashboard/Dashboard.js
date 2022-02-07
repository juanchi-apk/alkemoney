import React, { useState, useEffect } from 'react';
import { getUserTransactions } from '../api/transactions';
import {useDispatch, useSelector} from 'react-redux';
import { onSetUserTransactions, setUserBalance, setUserIncomes, setUserOutcomes } from '../store/payloads/actions';
import TransactionCreate from '../admin/TransactionCreate';
import TransactionBoard from '../admin/TransactionBoard';
import { useModal } from '../Hooks/useModal';
import Modal from '../Modals/modal'
import("./dashboard.scss");



const Dashboard = ()=>{

    const stateUser = useSelector(state => state.authData);
    const stateTransactions = useSelector(state=>state.transactions);
    const stateBalance = useSelector(state=>state.balance)

    const [userData, setUserData] = useState(stateUser)
    const [userTransactions, setUserTransactions] = useState(stateTransactions)
    const [userBalance , setUserBalance] = useState(stateBalance);
    const  [createIsOpen, createOpenModal, createCloseModal] = useModal(false)
    const dispatch = useDispatch()
    

    useEffect(()=>{
      
     
            const fetchUserTransactions = async () => {
            const response = await getUserTransactions(userData).catch(error=>{console.log(error.message)});
            dispatch(onSetUserTransactions(response?.data)); 
        
            

          
            }
            fetchUserTransactions();    
            setUserTransactions(stateTransactions);
            setUserBalance(stateBalance)
          /*  setUT()
          then((data)=>{return data});
            console.log(userTransactions) */

        },[])
    console.log(stateTransactions)
    console.log(stateBalance)


        
  
    return (<div className='dashboardContainer'>
        {(!stateTransactions.length>0) && (
            <div>
                Bienvenido {userData?.result.givenName}! Aca podes hacer tu primer transaccion!
               
            </div>
        )}
        <div>
        <div>
        Bienvenido {userData?.result.givenName}! Tu Balance total es <strong>{`$ ${stateBalance}`}</strong>!

        </div>
        
        <div className = "row">

         <div  className ="col-sm-8">
         <TransactionBoard userData= {userData} transactions={stateTransactions}/>
         </div>
         <div className ="col-sm-4">
         <button type="button" className="btn btn-danger createButton" onClick={createOpenModal}> + CREATE NEW TRANSACTION</button>
         
         </div>

         </div>
         {createIsOpen&&(<Modal  isOpen = {createIsOpen} closeModal = {createCloseModal}>
            {userData&&(<TransactionCreate  userData={userData}/>)}
         </Modal>)}
         
        </div>
         </div>)



}

export default Dashboard