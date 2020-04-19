import * as React from 'react';
import { apiUrl } from './utils';
import { CategoryForm } from '../forms/CategoryForm';
import { CategoryList } from '../lists/CategoryList';

export const Categories = props => {
    const { user } = props;
    const [currentCategory, setCurrentCategory] = React.useState({});
    const [formMode, setFormMode] = React.useState('new');
    const [categoriesList, setCategoriesList] = React.useState([]);

    const fetchCategories = () => {
        fetch(`${apiUrl}/users/${user.id}/categories`
        ).then(res => res.json()
        ).then(data => setCategoriesList(data));
    }

    React.useEffect(() => fetchCategories(), [categoriesList.length]);

    const createCategory = newCategory => {
        fetch(`${apiUrl}/users/${user.id}/categories`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: 'include',
            body: JSON.stringify(newCategory)
        }).then(res => res.json()).then(data => {
            if(data.errors) {
                console.error(data.errors);
            } else {
                setCategoriesList([...categoriesList, newCategory]);
            }
        });
    }
    const editCategory = updatedCategory => {
        fetch(`${apiUrl}/users/${user.id}/categories/${updatedCategory.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            credentials: 'include',
            body: JSON.stringify(updatedCategory)
        }).then(res => res.text()).then(data => {
            if(!data) {
                let newCategoriesList = [...categoriesList];
                let catIndex = categoriesList.findIndex((cat) => cat.id === currentCategory.id);
                newCategoriesList[catIndex] = currentCategory;
                setCategoriesList(newCategoriesList);
            } else {
                console.log("Failed to update Category because: " + data);
            }
        });
    };
    const deleteCategory = (catId) => {
        fetch(`${apiUrl}/users/${user.id}/categories/${catId}`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.text()).then(data => {
            if(!data) {
                setCategoriesList(categoriesList.filter((cat) => cat.id !== catId));
            } else {
                console.log("Failed to delete Category because: " + data);
            }
        });
    };

    const onEditCategory = (field, value) => {
        let newCategory = { ...currentCategory };
        newCategory[field] = value;
        setCurrentCategory(newCategory);
    }
    const onEdit = category => {
        setFormMode('edit');
        setCurrentCategory(category);
    }

    return (
        <>
            <CategoryList categories={categoriesList} onEdit={onEdit} onDelete={deleteCategory} />
            <CategoryForm category={currentCategory}
                onSubmit={formMode === 'new' ? createCategory : editCategory}
                onEditCategory={onEditCategory}
            />
        </>
    );
}