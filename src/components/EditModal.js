import React, { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { HOST, configuration, LocalHost } from "../utils/constants";

import { propTypes } from "react-bootstrap/esm/Image";
import { isConstructorDeclaration } from "typescript";
// import { response } from "express";

const EditModal = (props) => {
  const [EditModal, setEditModal] = useState(false);
  const [dd, setdd] = useState(null);
  // const [post, setpost] = useState("");
  const [edito, setEdito] = useState("");
  // const [top, settop] = useState();
  // const style = {
  //   width:"5vh",
  //   height:"2vh",

  // }

  // const HandleChange = (e) => {
  //   console.log(e.target.value);
  // };

  async function postData() {
    console.log(dd);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setdd((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // console.log(dd);
  const handleClick = () => {
    console.log(dd);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // mode: "no-cors",
      body: JSON.stringify({
        body: {
          address: dd.name,
          updateData: {
            name: dd.name,
            XP: dd.XP,
            solEarned: dd.solEarned,
            boopEarned: dd.boopEarned,
            Level: dd.Level,
          },
        },
      }),
    };
    fetch(`${LocalHost}/auth/updateUser`, configuration, requestOptions).then(
      (response) => console.log(response)
    );

    // .then(data => this.setState({ postId: data.id }));
    // async function modifyUser() {
    //   const res = await axios.put(
    //     `${HOST}/auth//auth/updateUser`,
    //     configuration,
    //     {
    //       body: {
    //         address: dd.name,
    //         updateData: {
    //           name: dd.name,
    //           XP: dd.XP,
    //           solEarned: dd.solEarned,
    //           boopEarned: dd.boopEarned,
    //           Level: dd.Level,
    //         },
    //       },
    //       withCredentials: false,
    //     }
    //   );

    //   const response = res.data;
    //   console.log(response);

    // }

    // modifyUser();

    // const postData = await axios.post(
    //   `${HOST}/auth/createUser?userIdentifier=AxqQqW1gQnXQsDFgkmMUvdVv42QP87MknxJZKnjhG5zu`,
    //   configuration,
    //   {
    //     body: {},
    //   }
    // );
  };
  const openModal = (username) => {
    // console.log(username);

    if (username) {
      let thisGuyData = props.alluserdata.filter(
        (userd) => userd.name === username
      );
      setEdito(thisGuyData[0]);
      setdd(thisGuyData[0]);
      console.log(thisGuyData[0]);

      // console.log(post);
      // setTimeout(() => {
      //   console.log(edito);
      // }, 1000);
    }

    // setedit(thisGuyData[0]);
    setEditModal(true);
    // const { name, description, level, XP, solEarned, boopEarned } =
    //   thisGuyData[0];

    // setedit
  };

  // console.log(post);
  return (
    <div>
      <React.Fragment>
        <Button
          onClick={() => openModal(props.username)}
          class="p-2 md:w-13 lg:w-15 mt-2 mb-2 mr-2 text-center rounded border-2 border-black  "
          style={{
            backgroundColor: props.color ? "green" : "transparent",
            color: props.color ? "white" : "black",
            border: "black 1px solid",
          }}
          // data-modal-target="staticModal"
          // data-modal-toggle="staticModal"
        >
          {props.edit}
        </Button>
        <Modal
          // id={staticModal}
          // data-modal-backdrop="static"
          show={EditModal}
          size="xl"
          popup={true}
          // onClick={() => setEditModal(true)}
        >
          <Modal.Header />

          <Modal.Body>
            {" "}
            {props.bath ? (
              <div className="space-y-1 px-3 pb-4 sm:pb-3 lg:px-8 xl:pb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {props.title}
                </h3>
                <div>
                  <div className=" block">
                    <Label htmlFor="Name" value={props.name} />
                  </div>
                  <TextInput
                    id="Name"
                    placeholder="name"
                    required={true}
                    type="url"
                  />
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="Address" value={props.id} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="address"
                    required={true}
                  />
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="Address" value={props.hunt} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="address"
                    required={true}
                  />
                </div>
                {/* </div> */}
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="Address" value={props.huntdes} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="address"
                    required={true}
                  />
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="Address" value={props.huntimg} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="address"
                    required={true}
                  />
                </div>

                {/* <div>
                  <div className="mb-1 block">
                    <Label htmlFor="Address" value={props.tweetcontent} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="address"
                    required={true}
                  />
                </div>
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="SolEarned" value={props.token} />
                  </div>
                  <TextInput id="token" type="number" required={true} />
                </div> */}
                {/* 
                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="BoopEarned" value="Reward type" />

                    <div>
                      <input
                        type="checkbox"
                        value="Boop"
                        name="Boop"
                        id="Reward type"
                      />
                      <label htmlFor="Boop">Boop</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="Sol"
                        name="Sol"
                        id="Reward type"
                      />
                      <label htmlFor="Sol">Sol</label>
                    </div>
                  </div>
                </div> */}

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="XP" value={props.XP} />
                  </div>
                  <TextInput id="xp" type="number" required={true} />
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="XP" value={props.Claimable} />
                  </div>
                  <TextInput id="xp" type="number" required={true} />
                </div>

                <div className="flex flex-row justify-between">
                  <div className="w-50% text-center mt-3 ">
                    <Button>{props.user}</Button>
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
            ) : (
              <form action="" method="">
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {props.title}
                  </h3>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="Name" value={props.name} />
                    </div>
                    <TextInput
                      id="Name"
                      // placeholder="name"
                      required={true}
                      name="name"
                      defaultValue={edito.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="Address" value={props.address} />
                    </div>
                    <TextInput
                      id="address"
                      // placeholder="address"
                      required={true}
                      // value={}
                      onChange={handleChange}
                      name="Level"
                      defaultValue={edito.Level}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="SolEarned" value={props.solEarned} />
                    </div>
                    <TextInput
                      id="sol"
                      type="number"
                      required={true}
                      onChange={handleChange}
                      name="SolEarned"
                      defaultValue={edito.solEarned}
                    />
                  </div>

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
                      defaultValue={edito.boopEarned}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="XP" value={props.XP} name="XP" />
                    </div>
                    <TextInput
                      id="xp"
                      type="number"
                      required={true}
                      onChange={handleChange}
                      name="XP"
                      defaultValue={edito.XP}
                    />
                  </div>

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
            )}
          </Modal.Body>

          {/* <Modal.Body> */}

          {/* </Modal.Body> */}
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default EditModal;
