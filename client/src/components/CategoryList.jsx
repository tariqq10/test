import { useEffect, useState } from "react"

const CategoriesList = () => {
    const [categories, setCategories] = useState([])

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

    return(
        <div>
            {categories.length > 0 ? (
                category.map((category) => (
                <CategoriesItem key={category.id} {...category}/>
                ))
            ) : (
                <p>No categories</p>
            )}
        </div>
    )

}
export default CategoriesList