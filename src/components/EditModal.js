import React, { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput, Spinner } from "flowbite-react";
import axios from "axios";
import { HOST, configuration, LocalHost } from "../utils/constants";
import { propTypes } from "react-bootstrap/esm/Image";
import { isConstructorDeclaration } from "typescript";
// import { response } from "express";

const EditModal = (props) => {
  const [EditModal, setEditModal] = useState(false);
  const [dd, setdd] = useState(null);
  const [post, setpost] = useState(null);
  const [edito, setEdito] = useState("");
  const [loading, setLoading] = useState(false)
  // const [top, settop] = useState();
  // const style = {
  //   width:"5vh",
  //   height:"2vh",

  // }

  // const HandleChange = (e) => {
  //   console.log(e.target.value);
  // };
  // //
  //   async function postData() {
  //     console.log(dd);
  //   }

  useEffect(() => {
    setLoading(false)
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;

    setdd((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const HandleCreateChange = (e) => {
    const { name, value } = e.target;

    setpost((prev) => {
      return { ...prev, [name]: value };
    });

    // console.log(post);
  };

  const HandleCreateClick = () => {
    // e.preventDefault();
    setLoading(true)
    let checkboxies = document.querySelectorAll(".checkboxi");
    let selVal = document.querySelector(".rewType")
    let cllVal = document.querySelector("#cllVal")


    let dataToPush = {
      tweet_url: post.twitter_url,
      tweet_id: post.twitter_id,
      hunt_title: post.hunt_title,
      hunt_description: post.hunt_Description,
      hunt_image: post.hunt_Image,
      tweet_username: post.tweetusername,
      tweet_content: post.tweet,
      xp_reward: 10,
      token_reward: parseFloat(post.token),
      reward_type: selVal.value,
      expiry_date: 3,
      isExpired: false,
      isApproved: true,
      time_stamp: new Date().toISOString(),
      total_claimed: 0,
      claimable: parseInt(cllVal.value),
      actions: [],
    };

    checkboxies.forEach((checi, i) => {
      if (
        checi.checked &&
        (checi.value === "like" ||
          checi.value === "follow" ||
          checi.value === "retweet")
      ) {
        // console.log(checi);
        let obj = {
          action: checi.value,
          description: checi.dataset.description,
          tweet_url: post.twitter_url,
        };
        dataToPush.actions.push(obj);
      } else if (checi.checked && checi.value === "comment") {
        let obj = {
          action: checi.value,
          description: "Drop a comment!",
          tweet_url: post.twitter_url,
        };
        dataToPush.actions.push(obj);
      }
    });
    console.log(dataToPush);
    async function postHunt() {
      try {
        const ress = await axios.post(
          `${LocalHost}/auth/createHunt`,
          dataToPush,
          configuration
        );
        console.log(ress.data);
        setLoading(false)
        setEditModal(false)
        alert("Created successfully")
        window.location.reload()
      } catch (error) {
        console.log(error);
        setLoading(false)
        alert("Something went wrong !")
      }
    }

    postHunt();

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
    fetch(`${HOST}/auth/updateUser`, configuration, requestOptions).then(
      (response) => console.log(response)
    );
  };

  const HandleCreate = () => {
    // e.preventDefault();
    // console.log("create fuction");
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
    }

    setEditModal(true);
    HandleCreate();
  };

  // console.log(post);
  return (
    <div>
      <React.Fragment>
        {props.bath ? (
          <Button
            onClick={() => openModal(props.username)}
            className="p-2 mt-2 mb-2 mr-2 text-center rounded border-2 border-black text-black"
          >
            {props.edit}
          </Button>
        ) : (
          <Button
            onClick={() => openModal(props.username)}
            className="p-2 mt-2 mb-2 mr-2 text-center rounded border-2 border-black text-black"
          >
            {props.edit}
          </Button>
        )}
        {/* <Button
        
          onClick={() => openModal(props.username)}
          className="p-2 mt-2 mb-2 mr-2 text-center rounded border-2 border-black"
          style={{
            backgroundColor: props.color ? "green" : "transparent",
            color: props.color ? "white" : "black",
            border: "black 1px solid",
          }}
        >
          {props.edit}
        </Button> */}

        <Modal show={EditModal} size="xl" popup={true} onClose={() => setEditModal(false)}>
          <Modal.Header />

          <Modal.Body>
            {" "}
            {props.bath ? (
              <div
                className="space-y-1 px-3 pb-4 sm:pb-3 lg:px-8 xl:pb-8"
                style={{ height: "400px", overflow: "auto" }}
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {props.title}
                </h3>
                <div className="mb-4">
                  <div className=" block">
                    <Label htmlFor="Name" value={props.name} />
                  </div>
                  <TextInput
                    id="Name"
                    placeholder="tweet Url"
                    required={true}
                    type="url"
                    name="twitter_url"
                    onChange={HandleCreateChange}
                  />
                </div>

                <div className="mb-4">
                  <div className="block">
                    <Label htmlFor="Address" value={props.id} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="6868789808776875554"
                    required={true}
                    onChange={HandleCreateChange}
                    name="twitter_id"
                  />
                </div>

                <div className="mb-4">
                  <div className="block">
                    <Label htmlFor="Address" value="Account Username" />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="Account Username"
                    required={true}
                    onChange={HandleCreateChange}
                    name="tweetusername"
                  />
                </div>

                <div className="mb-4">
                  <div className="block">
                    <Label htmlFor="Address" value={props.hunt} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="Hunt Title"
                    required={true}
                    onChange={HandleCreateChange}
                    name="hunt_title"
                  />
                </div>
                {/* </div> */}

                <div className="mb-4">
                  <div className="block">
                    <Label htmlFor="Address" value={props.huntdes} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="Hunt Description"
                    required={true}
                    onChange={HandleCreateChange}
                    name="hunt_Description"
                  />
                </div>

                <div className="mb-4">
                  <div className="block">
                    <Label htmlFor="Address" value={props.huntimg} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="Hunt Image URL"
                    required={true}
                    onChange={HandleCreateChange}
                    name="hunt_Image"
                  />
                </div>

                <div className="mb-4">
                  <div className="block">
                    <Label htmlFor="Address" value={props.tweetcontent} />
                  </div>
                  <TextInput
                    id="address"
                    placeholder="Tweet content"
                    required={true}
                    onChange={HandleCreateChange}
                    name="tweet"
                  />
                </div>

                <div className="mb-4">
                  <div className="block">
                    <Label htmlFor="SolEarned" value={props.token} />
                  </div>
                  <TextInput
                    id="token"
                    type="number"
                    required={true}
                    onChange={HandleCreateChange}
                    name="token"
                  />
                </div>

                <div className="mt-3 mb-3">
                  <Label
                    htmlFor="BoopEarned"
                    value="Reward type"
                    className="text-xl"
                  />

                  <div className="flex flex-row gap-6">
                    <label htmlFor="coin" className="" value="Reward Type">
                      <select name="Reward" className="rewType" onChange={HandleCreateChange}>
                        <option value="boop" name="boop">
                          Boop
                        </option>
                        <option value="sol" name="sol">
                          Sol
                        </option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <Label
                    htmlFor="BoopEarned"
                    value="Actions"
                    className="text-xl"
                  />

                  <div className="flex flex-row gap-6">
                    <div>
                      <input
                        type="checkbox"
                        value="follow"
                        name="follow"
                        data-description="Follow"
                        className="checkboxi"
                      />
                      <label htmlFor="Boop" className="pl-2">
                        Follow
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="like"
                        name="like"
                        className="checkboxi"
                        data-description="Like post"
                      />
                      <label htmlFor="Sol" className="pl-2">
                        {" "}
                        Like
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="comment"
                        name="comment"
                        className="checkboxi"
                        data-description="Drop a comment"
                      />
                      <label htmlFor="Boop" className="pl-2">
                        Comment
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="retweet"
                        className="checkboxi"
                        name="retweet"
                        data-description="Retweet Post"
                      />
                      <label htmlFor="Sol" className="pl-2">
                        Retweet
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 block">
                    <Label htmlFor="XP" value={props.Claimable} />
                  </div>
                  <TextInput
                    id="cllVal"
                    type="number"
                    required={true}
                    name="claimable"
                    onChange={HandleCreateChange}
                  />
                </div>

                <div className="flex flex-row justify-between">
                  {loading ? (
                    <div>
                      <Spinner size="lg" />
                    </div>
                  ) : (
                    <div className="w-50% text-center mt-3 ">
                      <Button onClick={HandleCreateClick}>{props.user}</Button>
                    </div>
                  )}


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
    </div >
  );
};

export default EditModal;
// \          <Button
//     onClick={() => openModal(props.username)}
//     className="p-2 md:w-13 lg:w-15 mt-2 mb-2 mr-2 text-center rounded border-2 border-black  "
//     style={{
//       backgroundColor: props.color ? "green" : "transparent",
//       color: props.color ? "white" : "black",
//       border: "black 1px solid",
//     }}
//     // data-modal-target="staticModal"
//     // data-modal-toggle="staticModal"
//   >
//     {props.edit}
//   </Button>
