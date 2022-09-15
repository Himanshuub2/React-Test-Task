import './App.css';
import {useState,useEffect} from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import {CardContent,Card,CircularProgress,Button,styled}from "@mui/material"


const initialData = JSON.parse(localStorage.getItem("data")) || [];


const CustomBtn = styled(Button)`

border-radius: 5px;
background:black;
color:white;
margin-bottom:7px;

:hover{
  background:grey;
}

`

function App() {

  
  const [load,setLoad] = useState(false);                // state for loading spinner
  const [user,setUser] = useState(initialData);               // state for api fetched data 
  const [counter,setCounter] = useState(initialData.length);           //state maintaining total data count.

  

const url = "https://dummyjson.com/products";                    ///dummy products API



const fetchData =async ()=>{

  setLoad(true);

  const result = await fetch(url);
  const data =await result.json();
    //  console.log(data.results); 

  localStorage.setItem("data",JSON.stringify(data.products));               //storing data in localStorage
  const localData = JSON.parse(localStorage.getItem("data"));

  setUser(localData);
  setLoad(false);
  // console.log(user);
  
  }



  const refreshBtn= async()=>{
    await fetchData();
    setCounter(JSON.parse(localStorage.getItem("data")).length)
  }




function deleteItem(idx){

  const newuser= user.filter(item=>item.id!==idx)
  // console.log(newuser);

  localStorage.setItem("data",JSON.stringify(newuser))
  setUser(JSON.parse(localStorage.getItem("data")))

  
  setCounter(newuser.length);
  localStorage.setItem("count",counter)
  console.log(localStorage.getItem("count"))
}
 
return (
    
    
    <div className="App">
      <div style = {{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",

      }}>

        <h1 >Total Items: {counter}</h1>
        <CustomBtn onClick = {refreshBtn}><RefreshIcon /></CustomBtn>

      </div>
      
      {
        load 
        
        ?

        <CircularProgress
        style={{
          position:"relative",
          top:"50%",
          left:"50%",
        }}
        />


       :
        <>
      
        {
          user.map(item=>(<div key={item.id}
                style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
                }}
                >
          <Card style={{width:"400px",marginBottom:"20px",
                border:"2px solid grey"
  
        
              }} >
            <CardContent style={{display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
             
            }}>

          
            <img src = {item.images[0]} width="200"></img>
            <h4>{item.title}</h4>
            <CustomBtn variant='contained' onClick = {()=>{deleteItem(item.id)}}>Delete</CustomBtn>
             </CardContent>
            </Card> 
              </div>
          ))
        }
      </>

        
      }
    
    </div>
  );
}

export default App;
