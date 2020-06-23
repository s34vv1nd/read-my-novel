import React from 'react';
import ReactModal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import { hideModal, chooseOption } from '../../actions/modal';


const buttons = (options, dispatch) => {

    return (
        options.map((option, index, arr) => (
            <Button
                key={index}
                variant={index === arr.length - 1 ? "primary" : "secondary"}
                onClick={async () => {
                    options[index].action();
                    dispatch(hideModal());
                }}
            >
                {option.name}
            </Button>
        ))
    )
}

const Modal = (
    { modal, dispatch }
) => (!modal || !modal.options) ? null : (
    <ReactModal show={modal.show} onHide={() => dispatch(hideModal())}>
        <ReactModal.Header closeButton>
            <ReactModal.Title>{modal.heading}</ReactModal.Title>
        </ReactModal.Header>
        <ReactModal.Body>{modal.body}</ReactModal.Body>
        <ReactModal.Footer>
            {buttons(modal.options, dispatch)}
        </ReactModal.Footer>
    </ReactModal>
);

const mapStateToProps = state => ({
    modal: state.modal
})

export default connect(
    mapStateToProps,
)(Modal);