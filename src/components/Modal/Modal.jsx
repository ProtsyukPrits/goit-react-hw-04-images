import { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, Backdrop } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-component');


export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }


  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('pushed esc');

      this.props.onClose();
    }
  }

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdrop}>
        <Backdrop>{ this.props.children}</Backdrop>
      </Overlay>, modalRoot
    );
  }
};
