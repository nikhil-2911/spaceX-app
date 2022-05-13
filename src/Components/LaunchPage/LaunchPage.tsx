import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LaunchPage.css";

// components
import Navbar from "../Navbar/Navbar";

const LaunchPage = () => {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [reused, setReused] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://api.spacexdata.com/v4/launches/${id}`
      );
      if (response.data) {
        setName(response.data.name);
        response.data.details === null
          ? setDetails("No Data")
          : setDetails(response.data.details);
        setDate(response.data.date_local.substring(0, 10));
        response.data.cores[0].reused === true
          ? setReused("True")
          : setReused("False");
      }
    };
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <table className="table">
        <thead>
          <tr>
            <th className="name">Name</th>
            <th className="details">Details</th>
            <th className="date">Date</th>
            <th className="reused">Reused</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="name">{name}</td>
            <td className="details">{details}</td>
            <td className="date">{date}</td>
            <td className="reused">{reused}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default LaunchPage;
