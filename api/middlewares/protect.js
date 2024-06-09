import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// Client'tan çerezler ile gönderilen jwt tokenin geçerliliğini kontrol edicek ve geçersiz ise hata göndericek

const protect = (req, res, next) => {
  //1) headers ile gelen tokene eriş
  let token = req.get("authorization");

  //2) token yoksa hata ver
  if (!token)
    return next(error(403, "You are not authorized to access this route"));

  token = token.replace(/"/g, "");

  //3) token geçerli mi kontrol et
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(error(403, "Your token is invalid"));

    //4) req içerisine kullanıcı id ve isSeller değerini ekle
    req.userId = payload.id;
  });

  //5) sonraki adıma devam et
  next();
};

export default protect;
