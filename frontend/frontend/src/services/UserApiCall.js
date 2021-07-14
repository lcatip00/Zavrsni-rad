import axios from 'axios'
import React, { useState, useEffect } from 'react'

function UserApiCall (userId){
    

    // const [username, setusername] = useState('');

    //     console.log("ovo je iz get user", userId)
    // axios.get(`http://127.0.0.1:8000/accounts/korisnik/${userId}`)
    // .then(res => {
    //     // console.log(res.data.results[0].username)
    //     // setAuthor(res.data.results[0].username)
    //     // console.log('ime: ',res.data.results[0].username)
    //     // return (res.data.results[0].username+'')
        
    //     // username = res.data.results[0].username
    //     console.log(typeof res.data.results[0].username)
    //     // setusername(res.data.results[0].username) 
    //     //console.log(typeof res.data.results[0].username)
    //     return  res.data.results[0].username
    // })
    // .catch(err => {
    //     console.log(err)
    // })

    //return await axios.get(`http://127.0.0.1:8000/accounts/korisnik/${userId}`).then(res => res.data.results[0].username)
  //   const token = localStorage.getItem('token');
  //   axios.get(`http://127.0.0.1:8000/accounts/myprofile`,
  //   {headers: {
  //     'Authorization': `Token ${token}` 
  //   }}).then(res => {
  //       console.log("Podaci o korisniku",res)
  //   }).catch(err => console.log("erorcina kod usera: ", err))
  //    //console.log("useeername varijabla: ", username)
    }

  export default UserApiCall;