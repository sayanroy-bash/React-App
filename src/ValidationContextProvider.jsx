import { useState } from "react";
import { ValidationContext } from "./ValidationContext";


const ValidationContextProvider=({children})=>{
  const [validated, setValidated]=useState(false);
  return(
    <ValidationContext.Provider value={{validated, setValidated}}>
      {children}
    </ValidationContext.Provider>
  )
}
export default ValidationContextProvider;