const CategoryItem = ({name, description, created_at}) => {
    return(
        <li>
            <div>
                <h5>{name}</h5>
                <p>{description}</p>
                <p>{created_at}</p>
            </div>
        </li>
    )
    
}
export default CategoryItem