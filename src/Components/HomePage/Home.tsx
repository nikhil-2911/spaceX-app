import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [report, setReport] = useState<any[]>([]);
  const onClickHandler = (e: any) => {
    e.preventDefault();
    if (value === "") {
      window.alert("Please, Select a Launch!");
    } else {
      navigate(`/launch/${value}`);
    }
  };
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://api.spacexdata.com/v4/launchpads"
      );
      if (response.data) {
        setReport(response.data);
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
            <th className="status">Status</th>
            <th className="launches">Launches</th>
          </tr>
        </thead>
        {report &&
          report.map((data: any, idx: number) => {
            return (
              <>
                <tbody key={idx}>
                  <tr>
                    <td className="name">{data.name}</td>
                    <td className="details">{data.details}</td>
                    <td className="status">{data.status}</td>
                    <td className="launches">
                      <select
                        className="select"
                        onChange={(e: any) => setValue(e.target.value)}
                      >
                        {data.launches.length === 0 ? (
                          <option>No Launch Available</option>
                        ) : (
                          <>
                            <option>Select Launch</option>
                            {data.launches
                              .slice(0, 3)
                              .map((launch: string, idx: number) => {
                                return <option value={launch}>{launch}</option>;
                              })}
                          </>
                        )}
                      </select>
                      {data.launches.length === 0 ? (
                        ""
                      ) : (
                        <button
                          className="button"
                          onClick={(e: any) => onClickHandler(e)}
                        >
                          Launch
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
      </table>
    </>
  );
};

export default Home;
