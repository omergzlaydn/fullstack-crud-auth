export const toggler =
  "group peer ring-0 text-xs bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-16 h-6  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-4 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95";

export const inputs = [
  {
    label: "Title",
    name: "title",
    isReq: true,
  },
  {
    label: "Descripiton",
    name: "desc",
    isReq: true,
  },
  {
    label: "Tag",
    name: "tag",
    isReq: true,
  },
  {
    label: "Cover Image",
    name: "cover",
    type: "file",
    isReq: true,
  },
  {
    label: "File",
    name: "file",
    type: "file",
    isReq: false,
  },
];
