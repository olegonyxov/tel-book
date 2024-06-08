import React from 'react';

function deleteItem(id) {
    console.log("button vanish " + id);
}

export default function ButtonDel({ id }) {
    return (
        <input type="button" value="Delete" onClick={() => deleteItem(id)} />
    );
}