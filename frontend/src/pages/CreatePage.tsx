import {type FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router";
import {ArrowLeftIcon} from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios.ts";

const CreatePage = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) {
            toast.error("All Fields Are Required")
            return
        }

        setLoading(true)
        try {
                await axiosInstance.post("/notes", {
                title: title,
                content: content
            })
            toast.success("Note Created Successfully")
            navigate("/")
        } catch (error) {
            toast.error("Failed to Create Note")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5"/>
                        Back to Notes
                    </Link>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                            <form onSubmit={handleSubmit}>
                                {/*Note Title*/}
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text"
                                           placeholder="Note Title"
                                           className="input input-bordered"
                                           value={title}
                                           onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                {/*Note Content*/}
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Content</span>
                                    </label>
                                    <textarea
                                           placeholder="Write your note here..."
                                           className="textarea textarea-bordered h-32"
                                           value={content}
                                           onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                                {/*  Form Button  */}
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" type="submit" disabled={loading}>
                                        {loading? "Creating..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreatePage;