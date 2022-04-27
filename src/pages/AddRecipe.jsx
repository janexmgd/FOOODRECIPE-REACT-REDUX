import React from "react";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../assets/styles/addrecipe.module.css";

import Img from "../assets/images/photo.svg";

import { addRecipe } from "../redux/actions/addRecipe";

const AddRecipe = () => {
  const [form, setForm] = useState({
    photo: "",
    title: "",
    ingredients: "",
    video: "",
  });
  const [photo, setPhoto] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("photo", form.photo);
    data.append("title", form.title);
    data.append("ingredients", form.ingredients);
    data.append("video", form.video);
    if (photo) {
      data.append("photo", photo);
    }
    if (form.title === "" || form.ingredients === "") {
      alert("field title dan ingredients wajib diisi");
    } else {
      addRecipe(data)
        .then((res) => {
          alert("sukses tambah recipe");
        })
        .catch((err) => {
          alert("gagal menambahkan recipe");
        });
    }
  };
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={styles.container}>
        <section>
          <div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className={styles.jumbotron}>
                <div className={styles.formPhoto}>
                  <img src={Img} className={styles.formPhotoImg} alt="" />
                  <input
                    className={styles.formPhotoInput}
                    type="file"
                    accept=".png, .jpg"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                  />
                </div>
                <div className={styles.formTitle}>
                  <h1 className={styles.formTitleH1}>Title</h1>
                  <input
                    className={styles.formTitleInput}
                    type="text"
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formIngredients}>
                  <h1>Ingredients</h1>
                  <textarea
                    cols="30"
                    rows="10"
                    onChange={(e) =>
                      setForm({ ...form, ingredients: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className={styles.formVideo}>
                  <h1>Video</h1>
                  <input
                    type="text"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        video: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit">Post</button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default AddRecipe;
