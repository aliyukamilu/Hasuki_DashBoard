import React from "react";
import { Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../../src/assets/img/logo.png";
// import { useNavigate } from "react-router-dom";
// import { Redirect } from "react-router";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { HOST, configuration } from "utils/constants";
// import {useContext} from "react"
// import { AuthUser } from "./Context/AuthContext";

const Login = () => {
  // const  = useContext(AuthUser)

  const history = useHistory();
  //   const navigate = useNavigate();
  const [data, setdata] = useState({
    Name: "",
    Password: "",
  });

  //   const [form, setform] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const Submit = (e) => {
    e.preventDefault();
    console.log(data);

    if (data.Name === "" || data.Password === "") {
      toast("Invalid Credentials");
    } else {
      axios
        .get(
          `${HOST}/auth/authenticateAdmin?username=${data.Name}&password=${data.Password}`,
          // `https://hasuki-raid-backend.vercel.app/auth/authenticateAdmin?username=admin&password=Hasuki@2023`,
          configuration
        )
        // .then((data) => console.log(data.data))
        .then((data) => {
          if (data.data.isAuthenticated === true) {
            history.push("/admin/dashboard");
          } else {
            null;
          }
        })

        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="">
        <div className="grid grid-cols-6 h-[100vh]">
          {/* <div className="col-span-3 ">
            <div className="background h-[100vh]">
              <p>Tribute of thats how we should be inside</p>
              <div className="grid place-items-center h-screen">
                <img src={Logo} alt="" className="sm:h-12 md:h-[44vh] " />
              </div>
            </div>
          </div> */}
          <div className="col-span-6 back">
            <div className="">
              {/* <div className="">
              </div> */}
              <form className="grid place-items-center h-screen  ">
                <div className="bg-white p-[8vh] border-2 border-gray-300">
                  <img
                    src={Logo}
                    alt=""
                    className="h-[8vh] md:h-[12vh] mr-[auto] ml-[auto]"
                  />

                  <p className="my-4">Admin Login for Dashboard</p>

                  <div className="mt-2">
                    <div className=" block">
                      <Label htmlFor="email4" value="Name :" />
                    </div>
                    <TextInput
                      id="email4"
                      type="text"
                      icon={FaUser}
                      placeholder="Name"
                      required={true}
                      name="Name"
                      value={data.Name}
                      onChange={handleChange}
                      style={{ borderRadius: "3vh" }}
                      className="md:w-[53vh]"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="block">
                      <Label htmlFor="email4" value="Password :" />
                    </div>
                    <TextInput
                      id="email4"
                      type="password"
                      icon={FaLock}
                      placeholder="Password"
                      required={true}
                      name="Password"
                      value={data.Password}
                      onChange={handleChange}
                      style={{ borderRadius: "3vh" }}
                    />
                  </div>

                  <button
                    className="w-full  mt-5 bg-[transparent] hover:bg-[#ff6000] hover:text-white text-[#ff6000] py-2 "
                    onClick={Submit}
                    style={{ border: "1px solid #ff6000", borderRadius: "2vh" }}
                  >
                    <ToastContainer
                      position="top-center"
                      theme="dark"
                      //   style={{ backgroundColor: "red" }}
                    />
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
