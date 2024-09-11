// loading packages
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExtensionContext40 } from '@looker/extension-sdk-react'
import { Heading, Box, Button, InputText, ComponentsProvider, Text, IconButton, Flex, FieldTextArea } from '@looker/components'
import { School, Science, ChatBubble, Book, ThumbUp, ThumbDown, Send } from '@styled-icons/material'
import {  PatchQuestionFill, Clipboard, StopCircleFill } from '@styled-icons/bootstrap'
import { Pivot } from '@looker/icons'
import { ms } from 'date-fns/locale'
import { Results } from 'styled-icons/foundation'
import { log } from 'console'


// Interface for chat messages
interface Message {
  sender: 'user' | 'system';
  text: string;
  name: string;
  timestamp: string;
  feedback?: 'up' | 'down' | null; // Optional feedback property
}

// Define the SovrnScholar component
export const SovrnScholar: React.FC = () => {
  const { coreSDK, extensionSDK } = useContext(ExtensionContext40)
  const [message, setMessage] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState<string>('User') // Store the user's name
  const [questionsVisible, setQuestionsVisible] = useState(true) // State to control collapse/expand
  const [questions, setQuestions] = useState<{ text: string; icon: JSX.Element }[]>([]);
  

  useEffect(() => {
    const getMe = async () => {
      try {
        const me = await coreSDK.ok(coreSDK.me())
        setMessage(`Hello, ${me.display_name}`)
        setUserName(`${me.display_name}`) // Set the user's name here
      } catch (error) {
        console.error(error)
        setMessage('An error occurred while getting information about me!')
      }
    }
    getMe()
  }, [coreSDK])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  

  const handleSubmitQuestion = async () => {
    if (!inputValue.trim()) return; // Prevent submitting empty or whitespace-only questions

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: inputValue, name: userName, timestamp, feedback: null },
    ]);

    // Hide suggested questions when a question is submitted
    setQuestionsVisible(false);

    // Set loading state
    setIsLoading(true);
    setInputValue('');
    try {
      // Replace this section with your Databricks logic
      const query = await coreSDK.ok(coreSDK.create_sql_query({
        "connection_name": "databricks_anayltics",
        "sql": `SELECT ai_query('agents_business_intelligence-llm_data-v111', request => named_struct('messages', ARRAY(named_struct('role', 'user', 'content', '${inputValue}'))), returnType => 'STRUCT<choices:ARRAY<STRING>>')`,
        "vis_config": {}
      }));

      let result = await coreSDK.ok(coreSDK.run_sql_query(query.slug, 'txt'));

      // Log the result to inspect its structure
      console.log("Raw query result:", result)

      console.log(typeof result) // print result type 
      // JSON hanlding is broken only doing text parsing

      let resultClean = '';
      console.warn('Failed to parse the JSON result, falling back to text handling.');
      resultClean = result
        .replace(/ai_query\(.*?\)/, '')
        .replace(/STRUCT<.*?>/g, '')
        .replace(/choices:.*?content:/, '')
        .replace(/\s+/g, ' ')
        .replace(/[\[\]{}"]/g, '')
        .replace(/choices:index:0,message:role:assistant,content:/, '')
        .replace(/[))], >[)] /, '')
        .replace(/\\n/g, "\n")
        .replace(/\n/g, "\n")
        .replace(/\)/,'') // removing first ) 
        .trim();
      // Fallback if the response isn't valid JSON
      
      console.log(resultClean)

      // Clean up for display
      resultClean = resultClean || 'No meaningful response could be parsed.'

      // Add the system message to the chat as "Sovrn Scholar"
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: resultClean, name: 'Sovrn Scholar', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), feedback: null },
      ]);

    } catch (error) {
      console.error('Error occurred during SQL query execution:', error);

      // Add error message to the chat as "Sovrn Scholar"
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'An error occurred while processing your request.', name: 'Sovrn Scholar', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), feedback: null },
      ]);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }

    // Clear input value
    
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmitQuestion();
    }
  };
  // partial solution to keyboard event depreciation
  // document.addEventListener('keydown', function(event) {
  //   if (event.key === 'Enter') {
  //     handleSubmitQuestion();
  //   }
  // });

  // Handle thumbs up/down clicks
  const handleFeedback = (index: number, feedback: 'up' | 'down') => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) =>
        i === index ? { ...msg, feedback } : msg
      )
    );
  };

  // Larger pool of predefined questions
  const allQuestions = [
    { text: 'What do our clients think of our Commerce Unified?', icon: <School size={30} /> },
    { text: 'What is the Sovrn Exchange?', icon: <Science size={30} /> },
    { text: 'What recommendations should I give a client who just adopted Ad Management?', icon: <ChatBubble size={30} /> },
    { text: "Are Sovrn's business priorities aligned with customer feedback?", icon: <Book size={30} /> },
    { text: 'How do I set up a report?', icon: <Book size={30} /> },
    { text: 'How is floor pricing handled for inventory?', icon: <Science size={30} /> },
    { text: 'What is the preferred way for web integration?', icon: <ChatBubble size={30} /> },
    { text: 'How often should we schedule calls to discuss progress?', icon: <School size={30} /> },
  ];

  // Function to randomly select a subset of questions
  const getRandomQuestions = (numQuestions: number) => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  };

  // Randomly select 3 questions to display
  // const questions = getRandomQuestions(3)


  const fetchQuestions = () => { // called on mount and when a user clicks the open questions button
    const newQuestions = getRandomQuestions(3);
    setQuestions(newQuestions);
  };

  useEffect(() => {
    fetchQuestions(); // This will fetch questions on mount
    console.log(questions)
  }, [])

  // Copy sovrn scholar response functionality 

  const writeToClipboard = (message: string) => {
    try {
      extensionSDK.clipboardWrite(
        message
      )
      console.log("copied to clipboard")
    } catch (error) {
      console.log("copied to clipboard has fail")
      console.error(error)
    }
  }


  return (
 <ComponentsProvider
  themeCustomizations={{
    colors: { key: '#282828' }, 
  }}
>
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="90vh"
    backgroundColor="#FFFFFF"
  >
    <Box width="75%" position="relative">
      
      {/* Suggested questions overlay */}
      {questionsVisible && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          zIndex="10"
          backgroundColor="white"
          p="medium"
          borderRadius="10px"
          style={{ 
            transform: 'translate(-50%, -50%)',  // Center the box 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Flex justifyContent="center" alignItems="center">
            {questions.map((q, index) => (
              <Box
                key={index}
                p="large"
                m="medium"
                width="200px"
                height="150px"
                backgroundColor="#FFD42B"
                borderRadius="10px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => {
                  setInputValue(q.text);
                  handleSubmitQuestion(); // Submit the question directly
                  setQuestionsVisible(false); // Collapse questions on click
                }}
                style={{ cursor: 'pointer' }}
              >
                {q.icon}
                <Text
                  mt="small"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="small"
                  color="black"
                >
                  {q.text}
                </Text>
              </Box>
            ))}
          </Flex>
          {/* Toggle button to hide suggested questions */}
          <Box textAlign="center" mt="medium">
            <Button onClick={() => setQuestionsVisible(false)}>
              Hide Suggested Questions
            </Button>
          </Box>
        </Box>
      )}

      {/* Message history display */}
      <Box
        mb="medium"
        overflowY="auto"
        minHeight="80vh"
        maxHeight="80vh"
        backgroundColor="white"
        borderRadius="8px"
        p="medium"
        position="relative"
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            p="medium"
            mb="small"
            borderRadius="8px"
            width="70%"
            ml={msg.sender === 'user' ? 'auto' : 0}
            mr={msg.sender === 'user' ? 0 : 'auto'}
            backgroundColor={msg.sender === 'user' ? '#FFD42B' : '#D3D3D3'}
            color="#282828"
            textAlign={msg.sender === 'user' ? 'right' : 'left'}
          >
            {/* Display the name and timestamp above the message */}
            <Box textAlign={msg.sender === 'user' ? 'right' : 'left'}>
              <Text fontWeight="bold" fontSize="small" mb="xsmall" color="rgba(0, 0, 0, 0.5)">
                {msg.name} - {msg.timestamp}
              </Text>
            </Box>
            <Text  fontSize="small" mb="small" style={{ whiteSpace: "pre-line" }}>
              {msg.text}
            </Text>
            {/* Thumbs up/down buttons for system responses */}
            {msg.sender === 'system' && (
            <Flex justifyContent="flex-end" mt="small">
              <IconButton
                icon={<Clipboard size={24} />}
                label="Copy Response"
                onClick={() => writeToClipboard(msg.text)}
                size="medium"
                mr="small"
              />
              <IconButton
                icon={<ThumbUp size={24} />}
                label="Thumbs Up"
                onClick={() => handleFeedback(index, 'up')}
                disabled={msg.feedback !== null}
                size="medium"
                ml="xsmall"  
              />
              <IconButton
                icon={<ThumbDown size={24} />}
                label="Thumbs Down"
                onClick={() => handleFeedback(index, 'down')}
                disabled={msg.feedback !== null}
                ml="xsmall"  
                size="medium"
              />
            </Flex>
            )}

            {/* Display feedback if already provided */}
            {msg.feedback && (
              <Text fontSize="small" mt="small">
                {msg.feedback === 'up' ? 'You liked this response' : 'You disliked this response'}
              </Text>
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input box and send question button together */}
      <Flex mb="large" justifyContent="center" alignItems="center" width="100%">
        <Box position="relative" width="100%">
          <InputText
            placeholder="Type your important question here..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Add Enter key submission
            pr="50px" // Add padding to the right to make space for the button
          />
          <IconButton
            icon={isLoading ? <StopCircleFill size={24} color="red" /> : <Send size={24} color="key" />}
            label="Send Prompt"
            onClick={handleSubmitQuestion}
            disabled={isLoading}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </Box>
        
      </Flex>

      {/* Show suggested questions button placed under the input box */}
      <Box textAlign="center" mb="medium">
        <IconButton
          icon={< PatchQuestionFill size={48} />}  
          label="Show Suggested Questions"
          onClick={() => {fetchQuestions(); setQuestionsVisible(true)}}
        />
      </Box>
    </Box>
  </Flex>
</ComponentsProvider>
  );
};
