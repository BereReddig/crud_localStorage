import React from 'react';
import reactDom from 'react-dom';
//components
import ModalForm from './ModalForm';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
};

const STYLE_OVERLAY = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

export default function UsersModal({ open, onClose }) {
    if (!open) return null;

    return reactDom.createPortal(
        <>
            <div style={STYLE_OVERLAY} />
            <div style={MODAL_STYLES}>
                <button onClick={onClose}>Close Modal</button>
                <ModalForm
                    onClose={onClose}
                />
            </div>
        </>,
        document.getElementById('portal')
    );
};