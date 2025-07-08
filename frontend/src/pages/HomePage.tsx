import Navbar from "../components/Navbar.tsx";
import {useEffect, useState} from "react";
import RateLimitUi from "../components/RateLimitUi.tsx";
import axios from "axios"
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.tsx";
import axiosInstance from "../lib/axios.ts";
import NotesNotFound from "../components/NotesNotFound.tsx";

const HomePage = () => {
    const [rateLimit, setRateLimit]= useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axiosInstance.get("/notes")
                setNotes(res.data)
                setRateLimit(false)
            } catch (error) {
                console.error("Error in fetching notes")
                if (axios.isAxiosError(error) && error.response?.status === 429) {
                    setRateLimit(true)
                } else {
                    toast.error("Failed to load notes")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            {rateLimit && <RateLimitUi />}

            <div className="max-w-7xl mx-autp p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading notes....</div>}

                {notes.length === 0 && !rateLimit && <NotesNotFound />}

                {notes.length > 0 && !rateLimit && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note: any) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default HomePage;