import * as React from 'react';
import API from '../main/API';
import { CategoryForm } from '../forms/CategoryForm';
import { CategoryList } from '../lists/CategoryList';

/**
 * Display a list of Categories for the currently logged-in User.
 *
 * Show form for creating, editing Categories.
 *
 * The following resources were helpful when writing this component:
 * https://github.com/kurmasz-SampleCode/CIS371-SampleCode/blob/master/react-blog-complete/src/components/Authors.jsx
 */
export const Categories = props => {
    const { user } = props;
    const defaultCategory = {name: ""}
    const [currentCategory, setCurrentCategory] = React.useState(defaultCategory);
    const [formMode, setFormMode] = React.useState('new');
    const [categoriesList, setCategoriesList] = React.useState([]);

    React.useEffect(() => {
        API.fetchCategories(user).then(data => {
            setCategoriesList(data);
        });
    }, [categoriesList.length]);

    const onSubmit = (categoryInfo) => {
        if(formMode === 'new') {
            API.createCategory(user, categoryInfo).then(data => {
                if(data.errors) {
                    console.error(data.errors);
                } else {
                    setCategoriesList([...categoriesList, categoryInfo]);
                }
            })
        } else {
            API.updateCategory(user, categoryInfo).then(data => {
                if(!data) {
                    let newCategoriesList = [...categoriesList];
                    let catIndex = categoriesList.findIndex((cat) => cat.id === currentCategory.id);
                    newCategoriesList[catIndex] = currentCategory;
                    setCategoriesList(newCategoriesList);
                } else {
                    console.log("Failed to update Category because: " + data);
                }
            })
        }
    }

    const onEditCategory = (field, value) => {
        let newCategory = { ...currentCategory };
        newCategory[field] = value;
        setCurrentCategory(newCategory);
    }

    const onEdit = category => {
        setFormMode('edit');
        setCurrentCategory(category);
    }
    const onDelete = catId => {
        API.deleteCategory(user, catId).then(data => {
            if(!data) {
                setCategoriesList(categoriesList.filter((cat) => cat.id !== catId));
            } else {
                console.log("Failed to delete Category because: " + data);
            }
        });
    }
    const onClear = () => {
        setFormMode('new');
        setCurrentCategory(defaultCategory);
    }

    return (
        <>
            <CategoryList categories={categoriesList} onEdit={onEdit} onDelete={onDelete} />
            <CategoryForm category={currentCategory} onSubmit={onSubmit} onEditCategory={onEditCategory} onClear={onClear} />
        </>
    );
}