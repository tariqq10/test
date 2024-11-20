import { useDispatch } from "react-redux"
import Navbar from "../components/Navbar"
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"

const NewDonationForm = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/categories")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Error", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const formik = useFormik({
    validationSchema:Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      target_amount: Yup.string().required("Target Amount is required"),
      category_id: Yup.string().required("Category is required"),
    }),
    initialValues: {
      title: "",
      description: "",
      target_amount: "",
      category_id: "",
    },
    onSubmit: async(values) => {
      axios
        .post("http://127.0.0.1:5000/requests", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("Donation request created successfully", res.data);
          navigate("/make-donation");
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  })
  

  
  return (
    <div>
      <Navbar />
      <div>
        <h2>Create Donation Request</h2>
        <form>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />

            <input
              type="number"
              name="target_amount"
              placeholder="Target Amount"
              onChange={formik.handleChange}
              value={formik.values.target_amount}
            />

            <select
            name="category_id"
            value={formik.values.category_id}
            onChange={formik.handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => {
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              })}
            </select>
            {formik.touched.category_id && formik.errors.category_id ? (
              <div style={{color: 'red'}}>{formik.errors.category_id}</div>
            ): null}

            <button type="submit">Create Request</button>

          </div>
        </form>
      </div>
    </div>
  );
}
export default NewDonationForm











