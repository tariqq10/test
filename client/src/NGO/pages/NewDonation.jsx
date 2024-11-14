import { useEffect } from "react";
import Navbar from "../components/Navbar";
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import toast from "react-hot-toast";
// import {setCategories, setField, clearForm} '../redux/slices/donationSlice'

// title, description, target_amount, status

const NewDonationForm = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.donationRequest)

  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const response = await axios.get('');
        dispatch(setCategories(response.data))
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    fetchCategories()
  }, [dispatch])

  const formik = useFormik({
    initialValues:{
      title: '',
      description:'',
      categoryName:'',
      targetAmount:'',
      status:'',
    },
    validationSchema:Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      categoryName: Yup.string().required("Category Name is required"),
      targetAmount: Yup.string().required("Amount is required").positive("Target must be a positive number"),
      status: Yup.string().required("Status is required")
    }),
    onSubmit: async (values) => {
      try{
        const requestData = {
          title: values.title,
          description: values.description,
          category_name: values.categoryName,
          target_amount: parseFloat(values.targetAmount),
          status: values.status
        };

        const response = await axios.post('')

        dispatch(clearForm());

        toast.success('Donation request created successfully!', {
          position: toast.POSITION.TOP_RIGHT
        })
      } catch(err){
        dispatch(setError('Error creating donation request'))


        toast.error('Error creating donation request. Please try again.',{
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
  })


  return (
    <div style={styles.formContainer}>
      <Navbar/>
      <h2>Create donation Request</h2>
      {formError && <div style={{color: 'red'}}>{formError}</div>}
      <form onSubmit={formik.handleSubmit}>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Enter Title"
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Enter a brief description of your donation"
            style={styles.textarea}
          />
        </div>

        

        <div style={styles.formGroup}>
          <label htmlFor="amount" style={styles.label}>Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
            placeholder="Amount of donation"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="date" style={styles.label}>Donation Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Submit Donation</button>
      </form>
    </div>
  );
};

// Inline styles object
const styles = {
  formContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  successMessage: {
    color: "#28a745",
    textAlign: "center",
    marginBottom: "1rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    resize: "vertical",
    minHeight: "100px",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
};

export default NewDonationForm;