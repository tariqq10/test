import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const CategoriesForm = () => {
    const session = JSON.parse(localStorage.getItem("session")); 
    const accessToken = session?.access_token; // Safely retrieve token

    const formik = useFormik({
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
            created_at: Yup.string().required("Creation date is required"),
        }),
        initialValues: {
            name: "",
            description: "",
            created_at: "",
        },
        onSubmit: async (values, { resetForm }) => {
            console.log("Access Token:", accessToken); // Debugging

            if (!accessToken) {
                toast.error("You are not logged in. Please login first.");
                return;
            }

            try {
                const res = await fetch("http://127.0.0.1:5000/categories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`, 
                    },
                    body: JSON.stringify(values),
                });

                const data = await res.json();

                if (res.ok) {
                    toast.success(`Successfully added category: ${values.name}`);
                    resetForm();
                } else {
                    toast.error(data.message || "An error occurred");
                }
            } catch (error) {
                toast.error("Network or server error occurred");
                console.error("Error:", error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Category name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={formik.errors.name ? "failure" : undefined}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className={formik.errors.description ? "failure" : undefined}
            />
            <input
                type="text"
                name="created_at"
                placeholder="Created At"
                value={formik.values.created_at}
                onChange={formik.handleChange}
                className={formik.errors.created_at ? "failure" : undefined}
            />
            <button type="submit">Add Category</button>
        </form>
    );
};

export default CategoriesForm;
