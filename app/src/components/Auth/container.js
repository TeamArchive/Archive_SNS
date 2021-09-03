import React, {useState} from "react";
import Auth from "./presenter";

function Container() {

	const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

	return (
		
		<Auth
			modalOpen	= {modalOpen}
			openModal 	= {openModal}
			closeModal	= {closeModal}
		/>
	);
}

export default Container;

