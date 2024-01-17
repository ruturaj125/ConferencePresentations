import React, { Fragment, useState, useEffect } from "react";
import { baseUrl } from '../constants';
import axios from "axios";
import Header from './Header';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function EditPresentation() {

  const [presentationID, setPresentationID] = useState("");
  const [title, setTitle] = useState("");
  const [presenterName, setPresenterName] = useState("");
  const [duration, setDuration] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const apiUrl = `${baseUrl}/api/Presentation/Get?presentationID=${id}`;
    axios.get(apiUrl).then((result) => {
      if (result.data && result.data.presentations !== undefined) {
        setPresentationID(id);
        setTitle(result.data.presentations.title)
        setPresenterName(result.data.presentations.presenterName)
        setDuration(result.data.presentations.duration)
      } else {
        alert("No data available.");
      }
    });
  }

  const handleSave = (e) => {

    let error = '';
    if (title === '')
      error = error + 'title ,';
    if (presenterName === '')
      error = error + 'presenterName ,';
    if (duration === '')
      error = error + 'duration ,';

    if (error.length > 0) {
      error = error.substring(0, error.length - 1) + 'can not be blank';
      alert(error);
      return;
    }

    e.preventDefault();
    const url = `${baseUrl}/api/Presentation/EditPresentation`;
    const data = {
      Id: presentationID,
      Title: title,
      PresenterName: presenterName,
      Duration: duration
    };

    axios
      .put(url, data)
      .then((result) => {
        clear();
        if (result.status === 200) {
          alert('Presentation details updated.');
          window.location.href = "/";
        }
        else
          alert('Some error occured');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clear = () => {
    setTitle("");
    setPresenterName("");
    setDuration("");
  };

  return (
    <Fragment>
      <Header />
      <div
        style={{
          backgroundColor: "white",
          width: "80%",
          margin: "0 auto",
          borderRadius: "11px",
        }}
      >
        <div className="mt-4" style={{ margin: "0 auto", width: "430px" }}>
          <h3>Update Presentation</h3>
        </div>
        <section
          className="vh-100"
          style={{ backgroundColor: "#eee", padding: "7px" }}
        >
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-black"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                placeholder="Title"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                onChange={(e) => setPresenterName(e.target.value)}
                                value={presenterName}
                                placeholder="Enter PresenterName"
                              />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <Input
                                type="number"
                                id="form3Example4c"
                                className="form-control"
                                min={2}
                                max={60}
                                onChange={(e) => setDuration(e.target.value)}
                                value={duration}
                                placeholder="Enter Duration"
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <Button
                              variant="contained"
                              onClick={(e) => handleSave(e)}
                            >
                              Submit
                            </Button>

                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
