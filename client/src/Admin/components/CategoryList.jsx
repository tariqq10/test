import { useEffect, useState } from "react"
import CategoryItem from "./CategoryItem"



const CategoriesList = () => {
    const [categories, setCategories] = useState([])

    const handleFilter = (category) => {
      const filtered = requests.filter((req) => req.category === category);
      setFilteredRequests(filtered);
    };

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"))

        if (!session) return;

        fetch({},{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => setCategories(data))
    }, [])

    return (
      <div>
        <div>
          <button onClick={() => handleFilter("Education")}>Education</button>
          <button onClick={() => handleFilter("Healthcare")}>
            Health Care
          </button>
          <button onClick={() => handleFilter("")}>All</button>
        </div>
        {categories.length > 0 ? (
          category.map((category) => (
            <CategoryItem key={category.id} {...category} />
          ))
        ) : (
          <p>No categories Available on the backend </p>
        )}
      </div>
    );

}
export default CategoriesList