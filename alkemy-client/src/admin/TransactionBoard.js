import  React,  {useState} from "react";
import { deleteUserTransaction } from "../api/transactions";
import { useModal } from "../Hooks/useModal";
import Modal from "../Modals/modal";
import ModifyTransaction from "./ModifyTransaction";

export default function TransactionBoard({transactions, userData}){

  const [modalData, setModalData] = useState();
  const  [isOpen, openModal, closeModal] = useModal(false);
  
  function handleModify (event, element){
    event.preventDefault()

    setModalData(element)
    console.log(element)
    openModal()


  }

 async  function handleDelete (event, element){
    
  let formData ={ transactionID : element.id_transaction}

    await deleteUserTransaction(userData ,formData)
    console.log("salio")
    window.location.reload()
  }


  return(
        <div>
           <table className="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">Transaction</th>
      <th scope="col">Amount</th>
      <th scope="col">Type</th>
      <th scope="col">Details</th>
      <th scope ="col"></th>
      <th scope ="col"></th>
    </tr>
  </thead>
  <tbody>
      {
          transactions.map(element => {
            let aux;
            let transactionClass;
            if (element.type===0){
                aux = "Income"
                transactionClass= "table-success"
            }else{
                aux = "Outcome"
                transactionClass= "table-danger"

            }
               return (
               
                <tr className = {transactionClass} key={element.id_transaction}>
                <th  scope="row">{element.id_transaction}</th>
                <td>{element.amount}</td>
                <td>{aux}</td>
                <td>{element.details}</td>
                <td>
                  <button type="button" onClick= {event=>{handleModify(event, element)}}className="btn btn-primary">Modificar</button>
                  
                </td>
                <td>
                <button type="button" className="btn btn-danger" onClick= {event=>{handleDelete(event, element)}}>Borrar</button>
                </td>
                </tr>
                
              )
          })
      }
    
  </tbody>
</table>

{isOpen&&(<Modal  isOpen = {isOpen} closeModal = {closeModal}>
  {modalData&&(<ModifyTransaction  formData={modalData} />)}
</Modal>)}

        </div>
    )

}