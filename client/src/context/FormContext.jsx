import { createContext,useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const formContext = createContext()


const FormContextProvider=({children})=>{
    const navigate = useNavigate()
    const [progress,setProgress] = useState(0)
    const [option,setOption] = useState("")
    const [open,setOpen] = useState(false);
    const [speech,setSpeech]=useState({english:"",norwegian:""})
    const [word,setWord]=useState({
      english:{word:"",parts_of_speech:"",definition:"",sentence:"",present_simple:"",present_continuous:"",present_perfect:"",present_perfect_continuous:"",past_simple:"",past_continuous:"",past_perfect:"",past_perfect_continuous:"",future_simple:"",future_continuous:"",future_perfect:"",future_perfect_continuous:""},
      norwegian:{word:"",parts_of_speech:"",definition:"",sentence:"",present_simple:"",present_continuous:"",present_perfect:"",present_perfect_continuous:"",past_simple:"",past_continuous:"",past_perfect:"",past_perfect_continuous:"",future_simple:"",future_continuous:"",future_perfect:"",future_perfect_continuous:""}
    })
    const notify = (message)=>{
        toast.info(message,{
            autoClose:1500,
            toastId:1,
            position:toast.POSITION.BOTTOM_RIGHT
        },);
    }
    const [sentence,setSentence]=useState({english:"",norwegian:""})
    const [select,setSelect]=useState({})
    const [phrase,setPhrase] = useState({english:"",norwegian:""})
    const [category,setCategory] = useState("")
    const verifyToken=async()=>{
        const response =await axios.post("http://localhost:9000/api/v1/verify-token",{},{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        if(response.data.status==400){
          navigate("/");
          return
        }
        navigate("/home")
      }
    return(
        <formContext.Provider value={{word,setWord,category,setCategory,sentence,setSentence,phrase,setPhrase,notify,progress,setProgress,verifyToken,open,setOpen,speech,setSpeech,select,setSelect,option,setOption}}>
            {children}
        </formContext.Provider>
    )
}

export {formContext,FormContextProvider}