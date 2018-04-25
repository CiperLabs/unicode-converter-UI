import React from 'react';
import Dropzone from 'react-dropzone';
import { post} from 'axios';
import '../App.css';
import fileLogo from '../file.png';
import docxLogo from '../docx.png';
import ReactLoading from 'react-loading';
import errorLogo from '../error.png';

let rootUrl = "http://localhost:8080/UnicodeConverter/webapi/fileupload/";

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
    this.downloadComponent = this.downloadComponent.bind(this);
    this.errorComponent = this.errorComponent.bind(this);
  }





dropzoneComponent(){

  return (<div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} style={{"position":"absolute","left":"20%","top":"24%","width" : "60%", "height" : "50%", "border" : "4px dashed black" , "outline":"2px dashed #000",  "outlineOffset":"-15px"}}  >


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
  return (<div style={{"position":"absolute","left":"45%", 'top':'20%', fontSize:"15px"}}>
            drop File Here
          </div>);
}
fileSelectedComponent(){

  return(<div className="submitter"style={{ margin :'5%' ,"position":"center", top:"40%" , height:"50%"}} >
                <img src={docxLogo} className="uploading"  alt="logo"/>

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
    let filename = files[0].name;
    let fname = filename.split(".")
    if(fname[fname.length -1]==='docx'){
          this.setState({
              files,component:'submiter'
           });
    }
    else{
            this.setState({
              component:'error',error:'Unsupported File Type, Converter only supports docx right now'
           });
    }

  }
  uploadFile(e){
    e.preventDefault();
    console.log("aaaaaaaaaaa");
    this.setState({component:'loading'});

        const url = 'http://localhost:8080/UnicodeConverter/webapi/fileupload/docx';
    const formData = new FormData();
    formData.append('file',this.state.files[0])
    const config = {
        headers: {
            'Access-Control-Allow-Origin':'*',
            'content-type': 'multipart/form-data'
        },
        timeout:100000,
    }
    post(url, formData,config).then((response)=>{
      console.log(response.data);
      if(response.data.error){
          this.setState({component : 'error', error : this.data.error})
      }
      else{
        this.setState({download_path : rootUrl+response.data.message});
        this.setState({component:'download'});
  
      }
  
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
  else if(this.state.component=== 'loading'){
    return this.loadingComponent();
  }
  else if(this.state.component === 'download'){
    return this.downloadComponent();
  }
  else if(this.state.component === 'error'){
    return this.errorComponent();
  }
}

loadingComponent(){

  return(    <div style={{"position":"absolute","left":"35%", 'top':'15%'}}>
                <p>Converting.. Please wait</p> 
                <ReactLoading type='balls' color="green"  height={300} width={400} />
              </div>);
}

downloadComponent(){


 return(<div className="centerComp" >
                  <div className="row" style={{margin:"5%"}} >
                    <img src={fileLogo} className="File-logo" alt="logo" />
                  </div>
                  <div className="row" style={{margin:"5%"}}>
                  <a href={this.state.download_path}>{this.state.download_path}</a>
                  </div>
                  <div className="row" style={{margin:"5%"}}>
                  <button onClick={this.cancelUpload} className='cancel-button'>
                        Go Back
                  </button>
                 </div>
          </div>
          );

}

errorComponent(){

  return(<div className="centerComp">
                  <div className="row" style={{margin:"5%"}}>
                    <img src={errorLogo} className="File-logo" alt="logo" />
                  </div>
                  <div className="row" style={{margin:"5%"}}>
                  <p>{this.state.error}</p>
                  </div>
                  <div className="row" style={{margin:"5%"}}>
                  <button onClick={this.cancelUpload} className='cancel-button'>
                        Go Back
                  </button>
                  </div>
          </div>
          );

}


  render() {
    return (
    
        this.componentManager()
          
    );
  }

}

export default Uploader
