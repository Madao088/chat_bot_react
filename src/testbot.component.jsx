import React,{Component} from "react";
import { Button,Col} from 'react-bootstrap';
import Sound from 'react-sound';
import { ReactMic } from 'react-mic';

class Bot extends React.Component{
    constructor(props){
        super(props);
        this.state={converstaion:[{text:'Hi.What can I do for You?',user:'agent'}],query:"",context:{},sound:false,ctr:0,record: false};
        this._handleKeyPress=this._handleKeyPress.bind(this);
        this.getData=this.getData.bind(this);
        this.getSearchResult=this.getSearchResult.bind(this);
        this.getEmotion=this.getEmotion.bind(this);
        this.startRecording=this.startRecording.bind(this);
        this.stopRecording=this.stopRecording.bind(this);
        this.onStop=this.onStop.bind(this);   
    }
    startRecording() {
        this.setState({
        record: true
        });
    }
 
    stopRecording (){
        this.setState({
        record: false
        });
    }
 
    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
    }

    getEmotion(){
        fetch("http://localhost:4000/watson/tone",{
             method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                query: this.state.conversation,
            })
        }).then((response)=>{
            if(response.ok)
                return response.json();
        }).then((response)=>{
            console.log(response);
        })
    }

    getSearchResult(e){
        fetch("http://localhost:4000/discovery/query?query="+e)
        .then((response)=>{
            if(response.ok)
                return response.json();
            else 
                alert("error");
        }).then((response)=>{
            console.log(response);
        })
    }

    getData(e){
        this.setState({sound:false});
        fetch("http://localhost:4000/watson/query",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                query: e,
                context:this.state.context
            })

        }).then((response)=>{   
            if(response.ok){
                return response.json();
                }
            else
                window.alert("Failed");
        }).then((response)=>{
            console.log(response);
             if(response.discovery==true)
                this.getSearchResult(response.input.text); 
            var conversation=this.state.converstaion;
            this.setState({query:response.output.text[0]});
            conversation.push({text:response.output.text[0],user:'agent'});
            this.setState({conversation:conversation});
            this.setState({context:response.context});
            this.setState({sound:true});
            this.setState({ctr:this.state.ctr+1});
            
        })

    }

    _handleKeyPress(e){
    if (e.key === 'Enter') {
        var conversation=this.state.converstaion;
        
        conversation.push({text:e.target.value,user:'customer'});
        this.setState({conversation:conversation});
        this.getData(e.target.value);
        e.target.value="";

    }
  }

    render(){
        var div={
            "border-style": "dotted"
        };
        var left={
        }
        var right={
            "text-align": 'right'
        }

        var tRight={
            "float": 'right'
        }

        
        return(
            <div>
                <Col md={6} mdOffset={3} >
                    <div style={div}>
                        {this.state.converstaion.map(function(con,i){
                            if (con.user=='agent')
                                return <p style={left}>{con.text}</p>
                            else
                                return <p style={right}>{con.text}</p>
                        }, this)}
                        <input style={tRight} type="textbox" onKeyPress={this._handleKeyPress}/>
                        <button onClick={this.getEmotion}>Get Emotion</button>
                        {/* { 
                           <Sound
                                url={"http://localhost:4000/watson/tts_test/"+this.state.ctr}
                                playStatus={this.state.sound?Sound.status.PLAYING:Sound.status.STOPPED}
                                playFromPosition={300}
                                onLoading={this.handleSongLoading}
                                onPlaying={this.handleSongPlaying}
                                onFinishedPlaying={this.handleSongFinishedPlaying}
                                /> 
                                } */}

                       {/* <ReactMic
                            record={this.state.record}
                            className="sound-wave"
                            onStop={this.onStop}/>
                            <button onClick={this.startRecording} type="button">Start</button>
                            <button onClick={this.stopRecording} type="button">Stop</button> */}
                        </div>
                        
                </Col>
                </div>
        );
    }
}

export default Bot;