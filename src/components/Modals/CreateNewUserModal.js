import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import { LocalHost, HOST, configuration } from "utils/constants";
// import { CiFaceSmile } from "react-icons/ci";

const CreateNewUserModal = (props) => {
  const [EditModal, setEditModal] = useState(false);
  // const [data, setdata] = useState({
  //   name: "",
  //   address: "",
  //   solEarned: "",
  //   BoopEarned: "",
  //   XP: "",
  // });

  const [address, setaddress] = useState("");

  const handleChange = (e) => {
    // const { name, value } = e.target;s
    const fff = e.target.name;
    const ggg = e.target.value;
    const ddd = { [fff]: ggg };
    console.log(ddd);

    const sss = Object.values(ddd);
    setaddress(sss);
    // console.log(sss);

    // setaddress(ddd);

    // console.log(data);
  };

  const handleClick = () => {
    // const { name, value } = address;
    // console.log(value);
    const Options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: process.env.REACT_APP_PJ_TOKEN,
      },
    };

    fetch(
      `http://localhost:3001/auth/Usertesting?userIdentifier=${address}`,
      Options
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    // axios
    //   .get(
    //     `http://localhost:3001/auth/Usertesting?userIdentifier=${address}`,
    //     configuration
    //   )
    // .get(
    //   `http://localhost:3001/auth/createUser?userIdentifier=${address}`,
    //   configuration
    // )
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // .catch((error) => console.error(error));
    // .then((res) => console.log(res.data))
    // .catch((err) => console.log(err));
  };

  const openModal = () => {
    setEditModal(true);
  };

  return (
    <>
      <Button
        onClick={() => openModal(props.username)}
        class="p-2 mt-2 mb-2 mr-2 text-center rounded border-2 border-black"
        style={{
          backgroundColor: props.color ? "green" : "transparent",
          color: props.color ? "white" : "black",
          border: "black 1px solid",
        }}
      >
        {props.edit}
      </Button>

      <Modal show={EditModal} size="xl" popup={true}>
        <Modal.Header />

        <Modal.Body>
          {" "}
          <form action="" method="">
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {props.title}
              </h3>
              {/* <div>
                <div className="mb-2 block">
                  <Label htmlFor="Name" value={props.name} />
                </div>
                <TextInput
                  id="Name"
                  // placeholder="name"
                  required={true}
                  name="name"
                  value={data.name}
                  // defaultValue={edito.name}
                  onChange={handleChange}
                />
              </div> */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Address" value={props.address} />
                </div>
                <TextInput
                  id="address"
                  // placeholder="address"
                  required={true}
                  // value={address}
                  onChange={handleChange}
                  name="address"
                  // defaultValue={edito.Level}
                />
              </div>
              {/* <div>
                <div className="mb-2 block">
                  <Label htmlFor="SolEarned" value={props.solEarned} />
                </div>
                <TextInput
                  id="sol"
                  type="number"
                  required={true}
                  onChange={handleChange}
                  name="solEarned"
                  value={data.solEarned}
                  // defaultValue={edito.solEarned}
                />
              </div> */}
              {/* 
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="BoopEarned" value={props.BoopEarned} />
                </div>
                <TextInput
                  id="boop"
                  type="number"
                  required={true}
                  onChange={handleChange}
                  name="BoopEarned"
                  value={data.BoopEarned}
                  // defaultValue={edito.boopEarned}
                />
              </div> */}

              {/* <div>
                <div className="mb-2 block">
                  <Label htmlFor="XP" value={props.XP} name="XP" />
                </div>
                <TextInput
                  id="xp"
                  type="number"
                  required={true}
                  onChange={handleChange}
                  name="XP"
                  value={data.XP}
                  // defaultValue={edito.XP}
                />
              </div> */}

              <div className="flex flex-row justify-between">
                <div className="w-50% text-center mt-3 ">
                  <Button onClick={handleClick}>{props.user}</Button>
                </div>

                <div className="w-50% text-center mt-3 ">
                  <Button
                    onClick={() => setEditModal(false)}
                    style={{ backgroundColor: "#dc3545" }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateNewUserModal;
