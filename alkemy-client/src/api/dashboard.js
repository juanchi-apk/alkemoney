import axios from 'axios';




const api = axios.create({
  baseURL: 'http://localhost:3001',
  
})

export  async function createNewCategory (category) {




    try {
      const response =   await api.post('/categories/add',{data:{category}})
     
       return response?.data

   } catch (error) {
       
       console.log(error.response)
   }

   
          }