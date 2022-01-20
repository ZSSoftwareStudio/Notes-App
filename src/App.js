import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Form from "./components/Form/Form";
import Notes from "./components/Notes/Notes";

function App() {
  const [notes, setNotes] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const allNotes = localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : [];
    setNotes(allNotes);
  }, []);

  const handleDelete = (id) => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes.filter((_, index) => index !== id))
    );
    setNotes(notes.filter((_, index) => index !== id));
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="row">
        <div className="left-col">
          <h1 className="fancy-heading">
            {notes.length <= 0 ? "Let's add our first note" : "Your Notes"}
          </h1>

          {notes.length <= 0 ? (
            <Form notes={notes} setNotes={setNotes} closeModal={() => {}} />
          ) : (
            <>
              <Notes notes={notes} onDelete={handleDelete} />
              <button onClick={openModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-add"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-10 overflow-y-auto"
                  onClose={closeModal}
                >
                  <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Dialog.Overlay className="fixed inset-0 bg-indigo-100" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                      className="inline-block h-screen align-middle"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-medium leading-6 text-gray-900"
                        >
                          Add New Note
                        </Dialog.Title>
                        <div className="my-8">
                          <Form
                            notes={notes}
                            setNotes={setNotes}
                            closeModal={closeModal}
                          />
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={closeModal}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="notes-close-icon mr-1 hover:scale-100 w-5 h-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Close
                          </button>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
            </>
          )}
        </div>
        <div className="right-col">
          <img
            className="hidden sm:inline-flex object-cover object-center rounded animated-image"
            alt="hero"
            src={require("./assets/welcome.jpg")}
          />
        </div>
      </div>
    </section>
  );
}

export default App;
