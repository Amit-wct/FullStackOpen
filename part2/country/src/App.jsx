import { useState,useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState(null)
  const [countryValue, setCountryValue] = useState("")

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((res)=>{
      console.log(res.data);
      setCountries(res.data);
      
    })
  },[])
if (countries)
  console.log(countries[0]);
  const handleSearch = (e)=>{
    const serachfor = e.target.value
    console.log('hello',);
    setCountryValue(serachfor)
    let sc = countries.filter((c)=>c.name.common.includes(serachfor));
    setCountries(sc)
    
  }

  console.log(countries);

  if(!countries) return 
  return (
    <>
     <div>
      <p>find countries</p>
      <input type="text" value={countryValue} onChange={(e)=>{
        handleSearch(e)
      }}/>
     </div>
     <div>
      {countries.length>10? <p>too many countries</p>: <p>hello</p>}
     </div>
    </>
  )
}

export default App
