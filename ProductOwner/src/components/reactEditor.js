import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "./../css/editor.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.setNewProduct((prevState) => ({
      ...prevState,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };
  render() {
    const { editorState } = this.state;
    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        here {this.props.data}
      </div>
    );
  }
}
