"use client";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  addCourse,
  getCourse,
  deleteCourse,
  updateCourse,
} from "../../helper/apihelper";
import { get } from "lodash";
import { Modal, Spin } from "antd";

function Home() {
  const [data, setData] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updatedCourse, setUpdatedCourse] = useState("");
  const [loading,setLoading]=useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getCourse();
      setCourseName(get(result, "data.courses"));
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async () => {
    try {
      await addCourse(data);
      fetchData();
      setData("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (data) => {
    try {
      await deleteCourse(data._id);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    console.log("clcik");
    try {
      await updateCourse({updateId,updatedCourse});
      fetchData();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <Spin spinning={loading}>
      <main className="flex min-h-screen flex-col items-center gap-10 p-5 md:p-24">
      <div className="flex ">
        <input
          type="text"
          placeholder="Add Course"
          className="rounded-[5px] w-40 md:w-80 px-4 py-2"
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
        <button
          onClick={handleClick}
          className="bg-green-500 py-1 px-4 md:py-2 md:px-6 rounded-md ml-5"
        >
          Add
        </button>
      </div>
      <>
        {courseName &&
          courseName.map((res, i) => {
            return (
              <div
                className="w-full flex items-center justify-between pl-[10vw] bg-white/30 py-4"
                key={i}
              >
                <p>{res.name}</p>
                <div className="pr-[10vw] flex gap-6 items-center">
                  <button
                    onClick={() => {
                      setOpen(!open);
                      setUpdateId(res._id);
                      setUpdatedCourse(res.name)
                    }}
                  >
                    <EditOutlined className="text-[22px] text-green-500" />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(res);
                    }}
                  >
                    <DeleteOutlined className="text-[22px] text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
      </>
      <Modal
        open={open}
        footer={false}
        closeIcon={false}
        width={360}
      >
        <div className="md:w-[20vw]">
          <input
            placeholder="Enter Update text"
            value={updatedCourse}
            onChange={(e) => {
              setUpdatedCourse(e.target.value);
            }}
            className="border pl-2 border-gray-400 outline-none rounded-md w-[76vw] py-1 lg:w-[20vw]"
          />
          <div className="flex gap-5 pt-5 items-end justify-end">
            <button
              onClick={() => {
                setOpen(!open);
              }}
              className="px-8 py-1 bg-red-400 text-white font-bold text-md text-center rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-8 py-1 bg-green-400 text-white font-bold text-md text-center rounded-md"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </main>
  </Spin>
  );
}

export default Home;
