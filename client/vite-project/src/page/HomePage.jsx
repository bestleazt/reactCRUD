import Navbar from "../components/Navbar";
import { useState,useEffect } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import Notecard from "../components/Notecard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchNotes = async () =>{
        try {
          const res = await api.get("/notes");
          console.log(res.data);
          setNotes(res.data)
          setIsRateLimited(false);
        } catch (error) {
          console.log('====================================');
          console.log("Error",error);
          console.log('====================================');
          if(error.response?.status === 429){
            setIsRateLimited(true);
          }else{
            toast.error("Failed to load notes");
          }
        } finally{
          setLoading(false);
        }
    };

    fetchNotes();
  },[]);

  return (
    <div className="min-h-screen">
      <Navbar/>
      {isRateLimited && <RateLimitedUI /> }

      <div className="max-w-7xl mx-auto p-4 mt-5">
        {loading && <div className="text-center text-primary py-10">loading notes...</div>}
         {notes.length === 0 && !isRateLimited && <NotesNotFound/> }
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
                <Notecard  key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>  
  )
}
export default HomePage