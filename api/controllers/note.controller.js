import error from "../utils/error.js";
import Note from "../models/note.model.js";

// filtreme ayarları oluşturan method
const buildFilters = (query) => {
  // filtreleme ayarlarının tanımlandığı nesne oluştur
  const filters = {};

  if (query.tag) {
    filters.tag = query.tag;
  }

  if (query.search) {
    filters.title = { $regex: query.search, $options: "i" };
  }

  if (query.userId) {
    filters.user = query.userId;
  }

  // fonksiyonun  çağrıldığı yere ayarları döndür
  return filters;
};

// 1) Bütün hizmetleri al
export const getAllNotes = async (req, res, next) => {
  // filtreme ayarlarını oluşturan fonk. çağır
  const filters = buildFilters(req.query);
  const perPage = req.query.perPage;

  try {
    const noteCount = await Note.find(filters).countDocuments();

    const notes = await Note.find(filters)
      .populate("user")
      .limit(2)
      .skip((req.query.page - 1) * perPage);

    if (notes.length > 0) {
      res.status(200).json({
        message: "Notes found",
        notes,
        page: req.query.page,
        totalPages: Math.ceil(noteCount / perPage),
      });
    } else {
      next(error(404, "No notes found for current user"));
    }
  } catch (err) {
    next(error(500, "There was an error while searching notes"));
  }
};

// 2) Bir hizmeti al
export const getNote = async (req, res, next) => {
  try {
    // urle param olarak eklenen id den yola çıkarak hizmetin bilgilerine eriş
    const note = await Note.findById(req.params.id).populate("user");

    res.status(200).json({
      message: "Note found",
      note: note,
    });
  } catch (err) {
    // gönderilen id'de hizmet yoksa hata gönder
    next(error(404, "Invalid id"));
  }
};

// 3) Yeni hizmet oluştur
export const createNote = async (req, res, next) => {
  // yeni hizmet oluştur
  const newNote = new Note({
    user: req.userId,
    ...req.body,
  });

  try {
    // hizmeti kaydet
    const savedNote = await newNote.save();

    // client'a cevap gönder
    res.status(200).json({
      message: "Note created successfully",
      note: savedNote,
    });
  } catch (err) {
    console.log(err);
    next(error(500, "There was an error while creating note"));
  }
};

// 4) Bir hizmeti sil
export const deleteNote = async (req, res, next) => {
  try {
    // 1) hizmetin detaylarını al
    const note = await Note.findById(req.params.id);

    // 2) hizmeti oluşturan ve silmek isteyen kullanıcı aynı mı kontrol et
    if (note.user != req.userId)
      return next(error(403, "User can only delete own notes"));

    // 3) hizmeti sil
    await Note.findByIdAndDelete(req.params.id);

    // 4) client'a cevap gönder
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    return next(error(500, "Error while deleting note"));
  }
};

export const updateNote = async (req, res, next) => {
  try {
    // 1) hizmetin detaylarını al
    const note = await Note.findById(req.params.id);

    // 2) hizmeti oluşturan ve silmek isteyen kullanıcı aynı mı kontrol et
    if (note.user != req.userId)
      return next(error(403, "User can only update own notes"));

    // 3) hizmeti sil
    await Note.findByIdAndUpdate(req.params.id, req.body);

    // 4) client'a cevap gönder
    res.status(200).json({ message: "Note updated" });
  } catch (err) {
    return next(error(500, "There was an error updating the note"));
  }
};
