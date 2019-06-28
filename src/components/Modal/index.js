import React from 'react';
import styled from 'styled-components';
import {IconContext} from "react-icons";
import {IoIosClose} from "react-icons/io";

const Container = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000000;
`;

const Message = styled.div`
    font-size: 24px;
    color: #FFF;
    padding: 20px;
    line-height: 29px;
`;

const Close = styled.div`
    position: absolute;
    top: 3vh;
    right: 3vw;
`

const Modal = (props) => {
    const {
        close,
        message
    } = props;

    return (
        <Container onClick={close}>
            <Message>{message}</Message>
            <Close onClick={close}>
                <IconContext.Provider value={{color:'#FFF', size:'10vh'}}>
                    <IoIosClose/>
                </IconContext.Provider>
            </Close>
        </Container>
    );
};

export default Modal;