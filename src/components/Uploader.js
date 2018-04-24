import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios, { post } from 'axios';
import '../App.css';
import fileLogo from '../file.png';
import docxLogo from '../docx.png';

class Uploader extends React.Component {
  constructor() {
    super()
    this.state = { files: [] , component: "uploader"}
    this.defaultComponent = this.defaultComponent.bind(this);
    this.fileSelectedComponent = this.fileSelectedComponent.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.dropzoneComponent =this.dropzoneComponent.bind(this);
    this.componentManager = this.componentManager.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
  }





dropzoneComponent(){

  return (<div className="dropzone"style={{ margin :'5%' ,"position":"center", top:"40%" , height:"50%"}} >
          <Dropzone onDrop={this.onDrop.bind(this)}             style={{"position":"absolute","left":"20%","width" : "60%", "height" : "50%", "border" : "4px dashed black" , "outline":"2px dashed #000",  "outlineOffset":"-15px"}}  >


            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (isDragActive) {
                return this.dropFileHere();
              }
              if (isDragReject) {
                return "This file is not authorized";
              }
              else if(acceptedFiles.length){
                return (<ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
            </ul>);
              }
              return acceptedFiles.length || rejectedFiles.length
                ? `Accepted ${<ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
            </ul>}, rejected ${rejectedFiles.length} files`
                :             this.defaultComponent();
            }}
          </Dropzone>
       </div>)
}
defaultComponent(){

  return(<div style={{"position":"absolute" ,"left":"18%", "top":"25%"}}>
            <p>Drop or Click here to upload docx files to convert to unicode.</p>
            <img src={fileLogo} className="File-logo" alt="logo" />
            
            </div>);
}
dropFileHere(){
  return (<div style={{"position":"absolute","left":"45%", 'top':'20%'}}>
            drop File Here
  </div>);
}
fileSelectedComponent(){

  return(<div className="submitter"style={{ margin :'5%' ,"position":"center", top:"40%" , height:"50%"}} >
                <img src={docxLogo} className="uploading"  />

                <ul>
                   { this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
                </ul>
                <div className="row">
                  <button onClick={this.cancelUpload} className='cancel-button'>
                    Cancel
                  </button>
                  <button onClick={this.uploadFile} className='upload-button'>
                    Upload File
                  </button>
   

                </div>
          </div>
            );
}
  onDrop(files) {
    this.setState({
      files,component:'submiter'
    });
  }
  uploadFile(e){
    e.preventDefault();
    console.log("aaaaaaaaaaa");
        const url = 'http://localhost:8080/UnicodeConverter/webapi/fileupload';
    const formData = new FormData();
    formData.append('file',this.state.files[0])
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    post(url, formData,config).then((response)=>{
      console.log(response.data);
  
       });
  }
  cancelUpload(e){
    e.preventDefault();
    this.setState({component:'uploader'});
  }

componentManager(){

  if(this.state.component==='uploader'){
    return this.dropzoneComponent();
  }
  else if(this.state.component === 'submiter'){
    return this.fileSelectedComponent();
  }
}




  render() {
    return (
    
        this.componentManager()
          
    );
  }

}

export default Uploader
