import { useState } from "react";
import Input from "../components/Input";
import { toggler } from "../utils/constants";
import api from "./../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import upload from "../utils/upload";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.target);

    // bütün inputlardaki verilerden bir nesne tanımla
    const newUser = Object.fromEntries(formData.entries());

    // fotoğrafı bulut depolama alanına yükle
    const url = await upload(newUser.photo);

    // buluttaki fotoğrafın url'ini nesneye kaydet
    newUser.photo = url;

    // kullanıcı hesabı oluşturmak için api isteği at
    api
      .post("/auth/register", newUser)
      // başarılı olursa
      .then(() => {
        // bildirim gönder
        toast.success("Account crated. Please Login");
        // logine yönlendir
        navigate("/");
      })
      // başarısız olursa
      .catch((err) => {
        // bildirim gönder
        toast.error("Bir sorun oluştu" + err.message);
      });
  };

  return (
    <div className="max-w-[900px] mx-auto ">
      <form
        className="grid md:grid-cols-2 md:gap-[100px] md:pt-24"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Create New Account
          </h1>
          <Input label="Name" isReq={true} name={"username"} />
          <Input label="Mail" isReq={true} name={"email"} />
          <Input
            label="Profile Picture"
            isReq={true}
            name={"photo"}
            type="file"
          />
          <Input
            label="Password"
            isReq={true}
            name={"password"}
            type="password"
          />
        </div>

        <Button text="Register" />
      </form>

      <p className="mt-5 text-gray-500">
        Already have an account?
        <Link className="ms-3 text-blue-500" to="/">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
