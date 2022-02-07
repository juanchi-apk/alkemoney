import axios from 'axios';




const api = axios.create({
  baseURL: 'http://localhost:3001',
  
})




export  async function getUserTransactions (userData) {
  const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      Authorization: `Bearer ${userData?.token}` //the token is a variable which holds the token
    }
  })

    try {
        const response =   await api.get('/transactions/get',{
            
           })
       
         return response?.data
     } catch (error) {
         
         console.log(error.response)
     }
         
              
            
        
        }


export  async function createUserTransaction (userData , transactionData) {


          try {
           
               const response =  await api.put('/transactions/new', transactionData, {
                  headers: {
                    Authorization: `Bearer ${userData.token}` //the token is a variable which holds the token
                  }})
               return response?.data
           } catch (error) {
               
               console.log(error.response)
           }
               
                    
                  
              
              }

              export  async function modifyUserTransaction (userData , transactionData) {


                try {
                  console.log(transactionData)
                   const response =  await api.post('/transactions/change', transactionData, {
                        headers: {
                          Authorization: `Bearer ${userData.token}` //the token is a variable which holds the token
                        }})
                     return response?.data 
                 } catch (error) {
                     
                    console.log(error.response) 
                 }
                     
                          
                        
                    
                    }

                    export  async function deleteUserTransaction (userData , transactionData) {

                      
                      try {
                        console.log(userData)
                        console.log(transactionData)
                        const response =  await api.delete('/transactions/delete', {
                          headers: {
                            Authorization: `Bearer ${userData.token}`
                          },
                          data: transactionData
                        })
                         return response?.data 
                       } catch (error) {
                           
                          console.log(error.response) 
                       }
                           
                                
                              
                          
                          }

        