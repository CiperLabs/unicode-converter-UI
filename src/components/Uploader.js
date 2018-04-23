import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import '../App.css';

class Uploader extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone"style={{ margin :'5%' ,"position":"center", top:"40%" , height:"50%"}} >
          <Dropzone onDrop={this.onDrop.bind(this)}             style={{"position":"absolute","left":"20%","width" : "60%", "height" : "50%", "border" : "4px dashed black" , "outline":"2px dashed #000",  "outline-offset":"-15px"}}  >
            <div style={{"position":"absolute" ,"left":"18%", "top":"40%"}}>
            <p>Drop or Click here to upload docx files to convert to unicode.</p>
            <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
            </ul>
            </div>
          </Dropzone>
        </div>
      </section>
    );
  }

}

export default Uploader
