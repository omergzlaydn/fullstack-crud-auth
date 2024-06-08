import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

// * kaydol : yeni hesap oluşturma
export const register = async (req, res, next) => {
  try {
    // şifreyi hashle ve saltla
    const hashedPass = bcrypt.hashSync(req.body.password, 5);

    // veritbanına kaydedilecek kullanıcyı oluştur
    const newUser = new User({ ...req.body, password: hashedPass });

    //  veritbanına kaydet
    await newUser.save();

    // clienta cevap gönder
    res.status(201).json({
      message: "New user created",
      user: newUser,
    });
  } catch (err) {
    // hata middlwarine yönlendirdik ve yönlendiriken hata açıklmasını gönderdik
    next(error(400, "Problem while createing account"));
  }
};

// * giriş yap: varolan hesaba giriş yap
export const login = async (req, res, next) => {
  try {
    // 1) ismine göre kullanıcyı bul
    const user = await User.findOne({ username: req.body.username });

    // 2) kullanıcı bulunamazsa hata gönder
    if (!user) return next(error(404, "User not found"));

    // 3) kullanıcı bulunursa şifresi doğrumu kontrol et (veritabanındaki hashlenmiş şifre ile isteğin body'sinde gelen normal şifreyi karşılaştır)
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // 4) şifre yanlışsa hata ver
    if (!isCorrect) return next(error(404, "Wrong Password"));

    // 5) şifre doğuysa jwt tokeni oluştur
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY
    );

    // şifre alanını kaldır
    user.password = null;

    // 6) tokeni çerzler ile client'a gönder
    res.status(200).json({
      message: "Signed into an account",
      user,
      token,
    });
  } catch (err) {
    next(error(400, "Problem when signing in"));
  }
};

// * çıkış yap: oturumu kapat
// kullanıcya giriş yaptığında gönderdiğimiz accessToken çerezinin geçerliliğini sonlandır
export const logout = async (req, res, next) => {
  res.status(200).json({
    message: "Kullanıcı hesabından çıkış yaptı",
  });
};
