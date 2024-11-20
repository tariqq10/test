import AdminNavBar from "../components/AdminNavBar"
import CategoriesForm from "../components/CategoriesForm"
import CategoriesList from "../components/CategoryList"

const Categories = () => {
    return (
    <div className="dashboard-main-content">
      <AdminNavBar />
      <h1>Categories</h1>
      <CategoriesList />
      <div>
        <h3>Add new category</h3>
        <CategoriesForm />
      </div>
    </div>
  );
};
export default Categories 