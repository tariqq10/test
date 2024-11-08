import React from 'react';

const CategoryList = ({ categories }) => {
  return (
    <div className="category-list">
      <h3>Categories</h3>
      <ul>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))
        ) : (
          <li>No categories available</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
