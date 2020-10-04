import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Recipe from './Recipe';

/** Representation of Recipe component as a modal */
const RecipeModal = ({ id, show, hide }) => (
    <Modal scrollable size='lg' show={show} onHide={() => hide()} aria-labelledby='selected recipe information'>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Recipe id={id} />
      </Modal.Body>
    </Modal>
);

export default RecipeModal;
