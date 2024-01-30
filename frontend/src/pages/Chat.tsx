import React from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';

const chatMessage = [
    {
        "role": "user",
        "content": "Hi there! How can I use your application?"
    },
    {
        "role": "assistant",
        "content": "Hello! Welcome to our application. To get started, you can navigate to the settings menu and customize your preferences."
    },
    {
        "role": "user",
        "content": "Thanks for the info. What features does the app offer?"
    },
    {
        "role": "assistant",
        "content": "Our app provides various features such as real-time chat, file sharing, and task management. You can explore more by checking out the menu options."
    },
    {
        "role": "user",
        "content": "Great! How can I invite friends to join the app?"
    },
    {
        "role": "assistant",
        "content": "To invite friends, go to the 'Invite' section and enter their email addresses. They will receive an invitation to join the app."
    }
]
const Chat = () => {
    const auth = useAuth();
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flex: 1, 
                width: "100%", 
                height: "100%", 
                mt: 3, 
                gap: 3 
            }}
        >
            <Box sx={{ display: { md: 'flex', xs: 'none', sm: 'none' }, flex: 0.2, flexDirection: 'column' }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        width: "100%", 
                        height: "60vh", 
                        bgcolor: "#111D27",
                        borderRadius: 5,
                        flexDirection: "column",
                        mx: 3
                    }}
                >
                    <Avatar sx={{ 
                        mx: "auto", 
                        my: 2, 
                        bgcolor: "white", 
                        color: "black", 
                        fontWeight: 700 
                        }}
                    >
                        { auth?.user?.name[0] } 
                        {/* { auth?.user?.name.split(" ")[1][0] } */}
                    </Avatar>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans" }}> 
                    You are talking to a ChatbBOT. 
                    </Typography>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}> 
                    You can ask questions related to Knowledge, Business, Advices, Education, etc. But avoid sharing your personal information.
                    </Typography>
                    <Button 
                        sx={{ 
                            width: "200px", 
                            my: "auto", 
                            color: "white", 
                            fontWeight: "700", 
                            borderRadius: 3, 
                            mx: "auto", 
                            bgcolor: red[300],
                            ":hover": {
                                bgcolor: red.A400
                            } 
                        }}
                    >
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flex:{ md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column', px: 3 }}>
                <Typography sx={{ textAlign: "center", fontSize: "40px", color: "white", mb: 2, mx: "auto", fontWeight: "600" }}>
                       Model - GPT 3.5 Turbo 
                </Typography>
                <Box 
                    sx={{ 
                        width: "100%", 
                        height:"60vh", 
                        borderRadius: 3, 
                        mx: 'auto', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        overflow: 'scroll', 
                        overflowX: "hidden", 
                        overflowY: "auto",
                        scrollBehavior: "smooth"
                        }}
                    >
                        {chatMessage.map(( chat, index ) => (
                            <ChatItem content={ chat.content } role={ chat.role } key={ index } />
                        ))}
                    </Box>
            </Box>
        </Box>
    )
}

export default Chat;

