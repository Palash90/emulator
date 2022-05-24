import React from "react";
import { Component } from "react";
import FileContext from "./FileContext";

class NewFile extends Component {
    constructor() {
        super();
        this.state = {
            label: 'New File', // default label
            edit: false, // default editing mode
        };

        // bind your component methods
        this.renderEdit = this.renderEdit.bind(this);
        this.changeLabel = this.changeLabel.bind(this);
        this.renderLabel = this.renderLabel.bind(this);
        this.changeEdit = this.changeEdit.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    /*
     * render a form, that changes the label
     * change the editing mode, when submitting
     */
    renderEdit() {
        return (
            <form onSubmit={this.changeEdit(false)}>
                <input
                    type="text"
                    value={this.state.label}
                    onChange={this.changeLabel}
                    onBlur={this.changeLabel}
                    onKeyDown={this.keyDown}
                />
            </form>
        );
    }

    changeLabel(e) {
        this.setState({ label: e.target.value });
    }

    keyDown(e) {
        if (e.key === 'Enter') {
            const files = this.context.files;
            const matchedFileNames = files.filter(file => file.name === this.state.label);
            if (!this.state.label || this.state.label === '') {
                alert("Please input a file name");
            }
            if (matchedFileNames.length < 1) {
                var newFileKey = files.length;
                files.push({ key: newFileKey, name: this.state.label, content: '' });
                this.context.setFiles([...files]);
                this.context.setCurrFile(newFileKey);
            } else {
                alert("File name already exists");
            }
            this.setState({ label: 'New File', edit: true })
        } else if (e.key === 'Escape') {
            this.setState({ label: 'New File', edit: false })
        }
    }

    renderLabel() {
        return (
            <a
                className="nav-link"
                data-toggle="tab"
                href="#"
                aria-expanded="false"
                onClick={this.changeEdit(true)}
            >
                {this.state.label}
            </a>
        );
    }

    /*
     * return a function for your events, that changes the editing mode
     */
    changeEdit(edit) {
        return e => {
            e.preventDefault();
            this.setState({ edit });
        };
    }

    render() {

        return this.state.edit ? this.renderEdit() : this.renderLabel();
    }
}

NewFile.contextType = FileContext;

export default NewFile;