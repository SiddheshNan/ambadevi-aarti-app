import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { getAll, setAll } from "./utils";

export default function Item() {
  let data = useLocation();
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    number: "",
    name: "",
    search_txt: [],
  });

  const [txtBox, setTxtBox] = React.useState("");

  useEffect(() => {
    if (!data.state.isNew) {
      setState(data.state.aarti);
      setTxtBox(data.state.aarti.search_txt.join("\n"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = () => {
    const arr = txtBox.split("\n");
    const newState = { ...state, search_txt: arr };
    setState(newState);

    const aartiData = getAll();

    if (data.state.isNew) {
      aartiData.push(newState);
      setAll(aartiData);
      navigate("/");
      return;
    } else {
      aartiData[data.state.index] = newState;
      setAll(aartiData);
      navigate("/");
    }
  };

  return (
    <div>
      <div>
        <div className="max-w-screen-md mx-auto p-5">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Action :{" "}
              <span className="text-indigo-600">
                {" "}
                {data.state.isNew ? "Add NEW" : "Edit"}
              </span>
            </h3>
          </div>
          <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 border-gray-400  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Enter number"
                  value={state.number}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, number: e.target.value }))
                  }
                />
              </div>

              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 border-gray-400  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Enter Name"
                  value={state.name}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Search text
                </label>
                <textarea
                  rows={10}
                  className="appearance-none block w-full bg-gray-100 border-gray-400  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  value={txtBox}
                  onChange={(e) => setTxtBox(e.target.value)}
                />
              </div>
              <div className="flex justify-between w-full px-3">
                <button
                  onClick={onSave}
                  className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
