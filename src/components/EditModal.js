import React, { useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import { propTypes } from "react-bootstrap/esm/Image";

const EditModal = (props) => {
  const [EditModal, setEditModal] = useState(false);
  // const style = {
  //   width:"5vh",
  //   height:"2vh",

  // }

  return (
    <div>
      <React.Fragment>
        <Button
          onClick={() => setEditModal(true)}
          class="p-2 w-13 mt-2 mb-2 mr-2 text-center rounded border-2 border-black"
          style={{
            backgroundColor: props.color ? "green" : "transparent",
            color: props.color ? "white" : "black",
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
          size="md"
          popup={true}
          onClick={() => setEditModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {props.title}
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Name" value={props.name} />
                </div>
                <TextInput id="Name" placeholder="name" required={true} />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Address" value={props.address} />
                </div>
                <TextInput id="address" placeholder="address" required={true} />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="SolEarned" value={props.solEarned} />
                </div>
                <TextInput id="sol" type="number" required={true} />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="BoopEarned" value={props.BoopEarned} />
                </div>
                <TextInput id="boop" type="number" required={true} />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="XP" value={props.XP} />
                </div>
                <TextInput id="xp" type="number" required={true} />
              </div>

              <div className="flex flex-row">
                <div className="w-50% text-center mt-3 ">
                  <Button>{props.user}</Button>
                </div>

                <div className="w-50% text-center mt-3 ">
                  {/* <Button onClick={() => setEditModal(false)}>Back</Button> */}
                </div>
              </div>
              {/*               
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a
                  href="/modal"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </a>
              </div> */}
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default EditModal;
