import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="border p-2 rounded-md cursor-pointer shadow hover:shadow-lg flex flex-col gap-3 max-md:flex-row"
    >
      <img
        className="h-full object-contain rounded-md max-md:max-w-[90px]"
        src={note.cover}
      />

      <div>
        <p className="font-semibold">{note.title}</p>

        <p className="bg-blue-500 py-1 px-2 w-fit rounded-md text-white">
          {note.tag}
        </p>
      </div>
    </Link>
  );
};

export default NoteCard;
