import "./modal.scss";


const Modal= ({children, isOpen, closeModal})=>{




    return(
 <article className= {`modal ${isOpen&&'isOpen'}`} >
<div className="modalContainer">

<div>
    <button className="modal-close" onClick={closeModal}>Cancel</button>
    
</div>
{children}
</div>

 </article>
 
 
)
}

export default Modal
