import React from "react";
import { Component, useContext } from "react";
import FileContext from "./FileContext";

class NewFile extends Component {
    constructor() {
        super();
        this.state = {
            label: 'New Tab', // default label
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
        const files = this.context;
        if (e.target.value && e.target.value !== '') {
            this.setState({ label: e.target.value }); // change label
        }
    }

    keyDown(e) {
        if (e.key === 'Enter') {
            const files = this.context;
            files.files.push({ key: files.files.length, id: files.files.length, name: this.state.label, content: '' });
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