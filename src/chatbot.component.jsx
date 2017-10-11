import React,{Component} from "react";
import ChatBot from 'react-simple-chatbot';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render() {

        const steps = [
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      trigger:'4'
    },
    {
      id: '4',
      user: true
    },
  ];

      return (
         <div>
            <ChatBot steps={steps} />
        </div>
      );
   }
}

export default Chat;