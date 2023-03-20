import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

const StandardModal = (props) => {

    return (
        <Modal
            size="sm"
            show={props.smShow}
            onHide={() => props.onHide}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
        </Modal>
    )
}

export default StandardModal;