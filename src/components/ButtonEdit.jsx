import React from 'react';

function changeItem(id) {
    console.log("button edit " + id);
}

export default function ButtonEdit({ id }) {
    return (
        <input type="button" value="Edit" onClick={() => changeItem(id)} />
    );
}