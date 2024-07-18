import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./index.css";

Modal.setAppElement('#root'); // This is important for accessibility

const Box = (props) => {
    const { boxData, reRender } = props;
    const { id, title, description, date, time, bg_color, font_color } = boxData;

    const [modalIsOpen, setIsOpen] = useState(false);
    const [titleChange, setTitle] = useState(title);
    const [descriptionChange, setDescription] = useState(description);
    const [bgColorChange, setBgColor] = useState(bg_color);
    const [fontColorChange, setFontColor] = useState(font_color);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            title: titleChange,
            description: descriptionChange,
            bg_color: bgColorChange,
            font_color: fontColorChange
        };

        axios.put(`https://sticky-notes-backend-1.onrender.com/updating_notes/${id}`, data)
            .then((response) => {
                console.log(response);
                closeModal();
                reRender();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deletingNotes = (id) => {
        axios.delete(`http://localhost:3000/notes/${id}`)
            .then((response) => {
                reRender();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div style={{ backgroundColor: bg_color, color: font_color }} className="LiStyle">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="time-div">
                <p>{time}</p>
                <p>{date}</p>
            </div>
            <div className="buttons-div">
                <button className="btn" onClick={openModal}>Edit</button>
                <button className="btn" onClick={() => deletingNotes(id)}>Delete</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)'
                        }
                    }}
                    contentLabel="Edit Note"
                >
                    <div className='modal-div'>
                        <h2>Edit Note</h2>
                        <button onClick={closeModal}>X</button>
                    </div>
                    <div>
                        <form onSubmit={handleFormSubmit} className='forms'>
                            <label>Title</label>
                            <input
                                type="text"
                                onChange={(event) => setTitle(event.target.value)}
                                value={titleChange}
                            />
                            <label>Description</label>
                            <textarea
                                onChange={(event) => setDescription(event.target.value)}
                                value={descriptionChange}
                            ></textarea>
                            <label>Background Color</label>
                            <input
                                type="color"
                                onChange={(event) => setBgColor(event.target.value)}
                                value={bgColorChange}
                            />
                            <label>Font Color</label>
                            <input
                                type="color"
                                onChange={(event) => setFontColor(event.target.value)}
                                value={fontColorChange}
                            />
                            <button type="submit" className='save-btn'>Save Changes</button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Box;
