import * as React from 'react';

export const CategoryListRow = props => {
    const { category } = props;

    return (
        <tr>
            <td>{category.name}</td>
            <td>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-secondary" onClick={() => console.log('Flappy Edit!')}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => console.log("Flappy Delete!")}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}