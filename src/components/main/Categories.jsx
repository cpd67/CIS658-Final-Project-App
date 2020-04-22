import * as React from 'react';
import API from '../main/API';
import { ErrorMessage } from './ErrorMessage';
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
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        API.fetchCategories(user).then(data => {
            setCategoriesList(data);
        }).catch(message => {
            setErrorMessage(message);
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
            }).catch(message => {
                setErrorMessage(message);
            });
        } else {
            API.updateCategory(user, categoryInfo).then(data => {
                let newCategoriesList = [...categoriesList];
                let catIndex = categoriesList.findIndex((cat) => cat.id === currentCategory.id);
                newCategoriesList[catIndex] = currentCategory;
                setCategoriesList(newCategoriesList);
            }).catch(message => {
                setErrorMessage(message);
            });
        }
    }

    const onEditCategory = (field, value) => {
        let newCategory = { ...currentCategory };
        newCategory[field] = value;
        setCurrentCategory(newCategory);
        setErrorMessage("");
    }

    const onEdit = category => {
        setFormMode('edit');
        setErrorMessage("");
        setCurrentCategory(category);
    }
    const onDelete = catId => {
        API.deleteCategory(user, catId).then(data => {
            setCategoriesList(categoriesList.filter((cat) => cat.id !== catId));
        }).catch(message => {
            setErrorMessage(message);
        });
    }
    const onClear = () => {
        setFormMode('new');
        setErrorMessage("");
        setCurrentCategory(defaultCategory);
    }

    return (
        <>
            <ErrorMessage message={errorMessage} />
            <CategoryList categories={categoriesList} onEdit={onEdit} onDelete={onDelete} />
            <CategoryForm category={currentCategory} onSubmit={onSubmit} onEditCategory={onEditCategory} onClear={onClear} />
        </>
    );
}