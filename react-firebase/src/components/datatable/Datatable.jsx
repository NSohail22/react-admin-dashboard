/* eslint-disable no-unused-vars */
import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleEnable = async (id) => {
    try {
      await doc(db, "users", id).update({
        enabled: true,
      });
      setData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((item) => item.id === id);
        newData[index].enabled = true;
        return newData;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const actionColumn = [
    {
      field: "enabled",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <button
            className="deleteButton"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </button>
        );
      },
    },
    {
      field: "action",
      headerName: "View",
      width: 120,
      renderCell: (params) => {
        return (
          <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
            <button className="viewButton">View</button>
          </Link>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;