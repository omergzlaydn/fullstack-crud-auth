import React, { useState } from "react";
import Input from "../components/Input"; // Assuming Input is a custom component
import { inputs } from "../utils/constants";
import upload from "../utils/upload";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const AddNote = ({ editItem }) => {
  const navigate = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const postMutation = useMutation({
    mutationFn: (data) => api.post(`/note`, data),
    onSuccess: (res) => {
      navigate(`/note/${res.data.note._id}`);
      toast.success(`Note Created`);
    },
    onError: () => {
      toast.warning("Failed to create note");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/note/${id}`, data),
    onSuccess: () => {
      navigate(`/note/${editItem._id}`);
      toast.success(`Note Updated`);
    },
    onError: () => {
      toast.warning("Failed to update note");
    },
  });

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (file && name === "cover") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const noteData = Object.fromEntries(formData.entries());
    const coverUrl = await upload(noteData.cover);
    noteData.cover = coverUrl || undefined;

    if (!editItem) {
      postMutation.mutate(noteData);
    } else {
      updateMutation.mutate({ id: editItem._id, data: noteData });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-5">
        {editItem ? "Edit Your Note" : "Create a New Note"}
      </h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-10">
        {inputs.map((input) => (
          <div key={input.name} className="mb-4">
            <label htmlFor={input.name} className="block font-bold mb-2">
              {input.label}
            </label>
            {input.type === "file" ? (
              <>
                <input
                  type="file"
                  id={input.name}
                  name={input.name}
                  accept={input.accept || "image/*"}
                  required={input.isReq}
                  onChange={(e) => handleFileChange(e, input.name)}
                />
                {input.name === "cover" && thumbnailUrl && (
                  <div className="mt-2">
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                )}
              </>
            ) : (
              <input
                type="text"
                id={input.name}
                name={input.name}
                required={input.isReq}
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={updateMutation.isLoading || postMutation.isLoading}
          className="my-10 bg-blue-500 p-2 font-bold text-white rounded hover:bg-blue-600"
        >
          {editItem ? "Save Note" : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default AddNote;
