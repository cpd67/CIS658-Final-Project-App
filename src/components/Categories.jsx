import * as React from 'react';
import { CategoryList } from './CategoryList';
  
export const Categories = props => {
    const categories = [
        {id: 1, name: 'Test!'},
        {id: 2, name: 'Flaps!'},
        {id: 3, name: 'Hey there!'}
    ];
    
    return <CategoryList categories={categories} />;
}