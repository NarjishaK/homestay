import PageHeader from "./global-components/page-header";
// import CallToActionV1 from './section-components/call-to-action-v1';
// <CallToActionV1 />
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";

function Admins() {
  //   render()
  let publicUrl = process.env.PUBLIC_URL + "/";

  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const handleCreate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("place", place);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("details", details);
    formData.append("image", image);
    try {
      const response = await axios.post(
        "http://localhost:7000/admin/adminpanel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API response:", response.formData);
      window.location.href = "/quarter#/adminpanellist";
    } catch (err) {
      console.log(err);
    }
  };
  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="ltn__login-area pb-110">
      <PageHeader headertitle="Admin Panel Create" subheader="Create" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Create <br />
                Homestays
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form action="#" className="ltn__form-box contact-form-box">
                <input
                  type="text"
                  id="place"
                  placeholder="Place Name"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />

                <input
                  type="file"
                  id="image"
                  placeholder="Image"
                  onChange={handleImage}
                  accept="image/*"
                />
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Details about place"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ width: "100%" }}>
                  <select
                    style={{
                      width: "100%",
                      height: "55px",
                      borderColor: "#b7d1d0",
                    }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Status</option>
                    <option>Availble</option>
                    <option>Not Availble</option>
                  </select>
                </div>
                <br />
                <br />
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    style={{ width: "100%" }}
                    onClick={handleCreate}
                  >
                    CREATE
                  </button>
                </div>
              </form>
              <div className="by-agree text-center">
                <div className="go-to-btn mt-20 go-top">
                  <Link to="/quarter#/adminpanellist">GO BACK</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admins;
