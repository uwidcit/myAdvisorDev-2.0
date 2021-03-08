import React, { Component } from "react";
import { Link } from 'react-router-dom'

class NoTranscript extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            data: null
        }
    }

    handleFiles = files => {
        console.log(files[0])
        this.setState({
            file: files[0]
        });
        
    }

    onChangeHandler = event =>{
        this.setState({
            file: event.target.files[0]
        })
    }

    onClickHandler = () => {
        var formdata = new FormData();
        formdata.append("file", this.state.file, "[PROXY]");
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/transcript/parseForm", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .then(this.props.uploadedHandler())
          .catch(error => console.log('error', error));
	}

  render() {
    return (
        <div>
            <div className="card details-card">
                <div className="card-body">
                    <p className="row-info">No transcript has been uploaded, please upload your unofficial transcript to get started with advising.</p>
                    <div class="input-field col-sm-4">
                        <form action="" enctype="multipart/form-data" method="POST">
                            <input type="file" name="file" onChange={this.onChangeHandler}/>
                            <input type="button" value="Upload" class="btn btn-custom blue-btn" onClick={this.onClickHandler}/>
                        </form>
                    </div>
                    <hr></hr>
                    <span className="row-info new-student">New student and don't have a transcript yet? </span>
                    <Link to="/career" onClick={this.props.newStudentHandler}>
                        <span className="row-info details-link new-student">Click here to get started</span>
                    </Link>
                </div>
            </div>
      </div>
    );
  }
}

export default NoTranscript;
