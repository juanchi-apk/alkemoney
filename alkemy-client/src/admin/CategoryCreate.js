
  import React, {useState, useEffect}  from 'react';
  import {setCatName, setError} from '../store/payloads/actions';
  import { connect } from 'react-redux';
  import { createNewCategory } from '../api/dashboard';
  import { setAllCategories , onGetCategories } from '../store/payloads/actions';
   import ('./CategoryCreate.scss')

  function CategoryCreate({onCatNameChange, onFormErrors,catname,errors}){
   
    const [prodFormErrors, setprodFormErrors] = useState(false);
    const [newCategory, setNewCategory] = useState("")

    async function createCategory(event){
      
      event.preventDefault();

      const response = await createNewCategory(newCategory)
       
 
      setAllCategories(response.data.categories)
      
      window.location.reload(false);


         
  }


    return (
      
          
            
              <div className="form-group row col-sm-12 mx-auto CatForm">
                <label htmlFor="inputCategory" className="col-sm-3 col-form-label">Or create</label>
                <div className="col-sm-9 ">
                <input type="text" className="form-control col-sm-5" name="inputCategory" id="inputCategory" placeholder="Insert New Category" onInput={(e) => setNewCategory(e.target.value)}/>
                <button  type="submit" className="btn btn-primary col-sm-3" onClick={event=>createCategory(event)}>Create!</button>
                </div>
                </div> 
        
      )
  }

  const mapStateToProps = (state) => {
    
      return{ 
                 catname: state.catname,
                 errors:state.errors,
            
      }
    }
    

  function mapDispatchToProps(dispatch){
      return {
        onCatNameChange: function(catname){
          dispatch(setCatName(catname))
        },
        onFormErrors: function(errors){
          dispatch(setError(errors))
        },
      }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreate);
