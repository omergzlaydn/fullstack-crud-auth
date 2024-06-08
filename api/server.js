import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// env dosyasındaki veriler erişmek için kurulum
dotenv.config({
  path: ".env",
});

// veritabanı ile bağlantı kur
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Veritabanı ile bağlantı kuruldu"))
  .catch((err) =>
    console.log("Veritabanı ile bağlantı kurulurken bir HATA oluştu", err)
  );

// express uygulması oluştur
const app = express();

//* middlewares
//a) bodydeki json içeriğinin okunmasını sağlar
app.use(express.json());

//b) kendi react uygulmamızdan gelen isteklere cevap vermesine izin ver
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//c) konsola istekleri yazan middlware
app.use(morgan("dev"));

//d) çerezleri işler ve erişilebilir hale getirir
app.use(cookieParser());

//* route tanımlama
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

//* hata yönetimi
// controller'lardan yapılcak tüm yönelndiröeler bu middleware'i tetikler
app.use((err, req, res, next) => {
  console.log("🔥🔥An Error Accured🔥🔥");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";

  return res.status(errStatus).json({
    statusCode: errStatus,
    message: errMessage,
  });
});

// hangi portun dinleniceğini belirleyelim
app.listen(process.env.PORT, () => {
  console.log(`API listens port ${process.env.PORT} `);
});
