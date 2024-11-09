import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast"

const categoriesForm = () => {

    const formik = useFormik({
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
            created_at: Yup.string().required("Time is required")

        }),
        initialValues: {
            name: "",
            description: "",
            created_at: ""

        },
        onSubmit: async(values, {resetForm}) => {
            const res = await fetch( {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
             },
             body: JSON.stringify()  
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(`Successfully added ${values.name}`);
                // addCategory(data)
                resetForm();
            } else {
                toast.error(data.message)
            }
        }
    })
    return(
        <form onSubmit={formik.handleSubmit}>
            <input
            type="text"
            name="name"
            placeholder="category name"
            value={formik.values.name}
            onChange={formik.handleChange}
            color={formik.errors.name ? "failure":undefined}
            />
            <input
            type="text"
            name="description"
            placeholder="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            color={formik.errors.description ? "failure":undefined}
            />

            <input
            type="created_at"
            name="date"
            placeholder="Created At"
            value={formik.values.created_at}
            onChange={formik.handleChange}
            color={formik.errors.created_at ? "failure" : undefined}
            />

            <button
            type="submit">
                Add category
            </button>
        </form>
        
    )
}
export default categoriesForm