import React, { Component } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 


export default class Welcome extends Component {

    state = {
        value: '**Hello world!!!**'
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ]
    }

    // formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
    //     'list', 'bullet', 'indent',
    //     'link', 'image'
    // ]

    onValueChange = (value) => {
        console.log(value, 'value');
        this.setState({
            value
        })
    }

    render() {
        const { value } = this.state
        // console.log(converter.makeMarkdown(value));
        
        return (
            <div className="background-white height-auto" style={{height:600}}>
                <ReactQuill
                    value={value}
                    theme="snow"
                    modules={this.modules}
                     className="background-white height-258" style={{height:600}}
                    // formats={this.formats}
                    onChange={this.onValueChange} />
            </div>
        )
    }
}