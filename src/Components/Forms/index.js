import React, { Component } from "react";
import axios from "axios"
import "./index.css";
import Box from "../Box";

import { v4 as uuidV4 } from "uuid";

class Forms extends Component {
    state = {
        allData: [{
            id: "123",
            title: "Write anything",
            description: "Track your Tasks",
            date: "123",
            time: "456",
            bgColor: '#ff6347',
            fontColor: '#000000'
        }],
        title: "",
        description: "",
        bgColor: '#ff6347',
        fontColor: '#000000'
    };

    componentDidMount() {
        axios.get("http://localhost:3000/notes")
            .then((response) => {
                const DataOfNotes = response.data;
                if (DataOfNotes.length !== 0) {
                    this.setState({
                        allData: DataOfNotes
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    



    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    };

    handleBgColorChange = (event) => {
        this.setState({ bgColor: event.target.value });
    }

    handleFontColorChange = (event) => {
        this.setState({ fontColor: event.target.value });
    }

    reRender = () => {
        axios.get("http://localhost:3000/notes")
            .then((response) => {
                const DataOfNotes = response.data;
                if (DataOfNotes.length !== 0) {
                    this.setState({
                        allData: DataOfNotes
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    addingDataintoState = () => {
        const { bgColor, fontColor, title, description } = this.state;
        const id = uuidV4();
        const date = new Date();
        const time = date.toLocaleTimeString();
        const toDayDate = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (title === "") {
            alert("Please enter title");
        } else if (description === "") {
            alert("Please enter description");
        } else {
            const data = {
                id,
                title,
                description,
                date: `${toDayDate}/${month}/${year}`,
                time,
                bg_color:bgColor,
                font_color:fontColor
            };

            this.setState(() => ({
                title: '',
                description: ''
            }));
            console.log("data",data)

            axios.post("http://localhost:3000/create_notes",data)
            .then((res)=>{
                console.log("byrr",res)
                this.reRender();
            })
            .catch((error) => {
                console.log(error)
            })
        }
    };

    render() {
        const { title, description, allData, bgColor, fontColor } = this.state;
        return (
            <div className="home">
                <div className="home-one">
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={this.handleTitleChange} 
                        className="search-style" 
                    />
                    <label>Description</label>
                    <textarea 
                        value={description}
                        onChange={this.handleDescriptionChange} 
                        cols="10" 
                        className="textarea-style" 
                        rows="10"
                    ></textarea>
                    <label>Background Color</label>
                    <input 
                        type="color" 
                        value={bgColor} 
                        onChange={this.handleBgColorChange} 
                        className="colorStyle" 
                    />
                    <label>Font Color</label>
                    <input 
                        type="color" 
                        value={fontColor} 
                        onChange={this.handleFontColorChange} 
                        className="colorStyle" 
                    />
                    <button onClick={this.addingDataintoState} className="add-btn">Add</button>
                </div>
                <div className="home-two">
                    {allData.length !== 0 ? (
                        allData.map((eachItem) => (
                            <Box reRender={this.reRender} boxData={eachItem} key={eachItem.id} />
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Forms;
