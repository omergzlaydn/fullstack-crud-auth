import Input from "../components/Input";
import { inputs } from "../utils/constants";
import upload from "../utils/upload";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const AddNote = ({ editItem }) => {
  const navigate = useNavigate();

  const postMutation = useMutation({
    mutationFn: (data) => {
      return api.post(`/note`, data);
    },

    onSuccess: (res) => {
      navigate(`/note/${res.data.note._id}`);

      toast.success(`Note Created`);
    },

    onError: () => {
      toast.warning("Failed to create");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      return api.patch(`/note/${id}`, data);
    },

    onSuccess: (res) => {
      navigate(`/note/${editItem._id}`);

      toast.success(`Note Updated`);
    },

    onError: () => {
      toast.warning("Failed to update");
    },
  });

  // form gönderilince
  const handleSubmit = async (e) => {
    // sayfayı yenilemeyi engelle
    e.preventDefault();

    // bütün inputlardaki veirlere eriş
    const formData = new FormData(e.target);
    const noteData = Object.fromEntries(formData.entries());

    // fotoğrafları bulut depolama alanına yükle
    const coverUrl = await upload(noteData.cover);

    // fotoğrafların url'ini nesneye kaydet
    noteData.cover = coverUrl || undefined;

    if (!editItem) {
      // api'a veriyi kaydet
      postMutation.mutate(noteData);
    } else {
      // api'daki veriyi kaydet
      updateMutation.mutate({ id: editItem._id, data: noteData });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-5">
        {editItem ? "Edit Your Note" : "Create a New Note"}
      </h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-10">
        {inputs.map((data) => (
          <Input {...data} editItem={editItem} />
        ))}

        <button
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
