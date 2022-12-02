import React from 'react';
import './addTeam.css';

type Props = {
    addNewTeam: () => void
}

const AddTeam = (props: Props) => {

    const {
        addNewTeam
    } = props;

    return (
        <div className={'col-12 col-sm-6 col-lg-4 p-3 '}>
            <button onClick={addNewTeam} className={'PlusContainer'}>
                +
            </button>
        </div>
    )
}


export default AddTeam;