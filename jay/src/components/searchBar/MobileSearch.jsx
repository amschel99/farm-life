import SearchIcon from "@mui/icons-material/Search";
import { Menu, MenuItem, TextField,Select,InputLabel,ListSubheader,InputAdornment,OutlinedInput, Box,List,ListItem,Button} from "@mui/material";
import React from 'react'
import { products } from '../../data'
export const MobileSearchBar = ({productsData,setProductsData}) => {
    const [value,setValue]=React.useState('')
  const searchRef=React.useRef()
  const[searchText,setSearchText]=React.useState('')
  const[showDropDown,setShowDropDown]=React.useState(false)
  React.useEffect(()=>{
console.log(productsData,setProductsData)
  },[])
  return (
    <Box sx={{display:'flex',flexDirection:'column',zIndex:100}} >
            <ListSubheader sx={{display:{xs:"block",sm:"none"}}}>
           <TextField
            //sx={{width:{xs:'55vw',sm:'30vw'}, position:{xs:'absolute', sm:"relative"}, right:{xs:'90px',sm:'0'}}}
           size="small"
              // Autofocus on textfield
              autoFocus

                  required
                  fullWidth
                  name="equipment"
                  label="Search Equipment"
                  type="text"
                  id="equipment"
                 

                   inputRef={searchRef}
           
             InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                <SearchIcon/>
                  </InputAdornment>
                )
              }}
             onChange={ (e)=>{
              setShowDropDown(true)

          
          
const filteredProducts= products.filter((product)=>product.name.toLowerCase().includes(e.target.value.toLowerCase())) 

setProductsData(filteredProducts)

setValue(e.target.value)

             }}
             onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  setShowDropDown(false)
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
                if(e.key==='ENTER'){
                  setShowDropDown(false)
                }
              
              }}
                />


                
                </ListSubheader>


  
     
<List sx={{flexDirection:"column",display:{sm:'none', xs: showDropDown &&productsData.length>0?'block':'none'},zIndex:500, height:'auto', overflowY:"scroll",backgroundColor:'#fff',maxHeight:'70vh'}}>
      {productsData.map(({name,description}) => (
            <ListItem
      
        component={Button}
        onClick={
          ()=>{
            const filteredProducts= products.filter((product)=>product.name===name)
            setProductsData(filteredProducts)
            setShowDropDown(false)
          }
        }
            sxts={{cursor:'pointer'}}
              key={name}
              value={name}
              
            >
              {name}
            </ListItem>
          ))}
         </List>
         
        </Box>       
  )
}

