// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { ExtensionContext40 } from '@looker/extension-sdk-react'
// import {
//   Card,
//   CardContent,
//   Heading,
//   Box,
//   Button,
//   InputText,
//   Space,
//   ComponentsProvider,
//   Text,
//   ButtonOutline,
//   IconButton,
//   Icon,
//   Drawer,
// } from '@looker/components'

// /**
//  * A simple component that uses the Looker SDK through the extension sdk to display a customized hello message.
//  */
// interface Message {
//   sender: 'user' | 'system';
//   text: string;
// }

// export const SovrnScholar: React.FC = () => {
//   const { coreSDK } = useContext(ExtensionContext40)
//   const [message, setMessage] = useState('')
//   const [inputValue, setInputValue] = useState('')
//   const [messages, setMessages] = useState<Message[]>([])
//   const messagesEndRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     const getMe = async () => {
//       try {
//         const me = await coreSDK.ok(coreSDK.me())
//         setMessage(`Hello, ${me.display_name}`)
//       } catch (error) {
//         console.error(error)
//         setMessage('An error occurred while getting information about me!')
//       }
//     }
//     getMe()
//   }, [coreSDK])

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleButtonClick = async () => {
//     console.log('Creating SQL query...')
    
//     // Adding the user input to the chatbox before sending the query
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'user', text: inputValue },
//     ]);
    
//     try {
//       const query = await coreSDK.ok(coreSDK.create_sql_query({
//         "connection_name": "databricks_anayltics",
//         // "sql": "SELECT 1",  // Simple query for testing
//         "sql":`SELECT ai_query('agents_business_intelligence-llm_data-v104_rag_v2', request => named_struct('messages', ARRAY(named_struct('role', 'user', 'content', '${inputValue}'))), returnType => 'STRUCT<choices:ARRAY<STRING>>')`,
//         "vis_config": {}
//       }))
  
//       if (query && query.slug) {
//         console.log(query)
//         console.log('Query slug:'+ query.slug)
        
//         // Simulate querying results from Looker
//         let result = await coreSDK.ok(coreSDK.run_sql_query(
//           query.slug, 'txt'))

//         console.log('query completed')
        
//         // Parse the result and display it in the chatbox
//         // const responseText = result?.[0]?.choices?.[0]?.toString() || 'No response available';
//         // console.log(result?[0]?.choices?.[0]?.toString()
//         // const responseText = result?[0]?.choices?.[0]?.toString()
//         console.log(result)
//         const matches = result.match(/"([^"]*)"/g);
//         const result_clean = matches.map(match => match.replace(/"/g, '')).join(' ');

//         const responseText = result_clean || 'No response available';
        

        
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { sender: 'system', text: responseText },
//         ]);
//       } else {
//         console.log("fail");
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { sender: 'system', text: 'An error occurred, please try again.' },
//         ]);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'system', text: 'An error occurred while processing your request.' },
//       ]);
//     }
    
//     setInputValue('');
//   };

//   return (
//     <ComponentsProvider
//       themeCustomizations={{
//         colors: { key: '#1A73E8' },
//       }}
//     >
//       <Card raised width="70%" m="auto">
//         <CardContent>
//           <Heading textAlign="center" pb="medium">
//             Sovrn Scholar - {message}
//           </Heading>
//           <Box mb="medium" height="600px" overflowY="auto">
//             {messages.map((msg, index) => (
//               <Box
//                 key={index}
//                 p="medium"
//                 mb="small"
//                 borderRadius="8px"
//                 width="60%"
//                 ml={msg.sender === 'user' ? 'auto' : 0}
//                 mr={msg.sender === 'user' ? 0 : 'auto'}
//                 backgroundColor={msg.sender === 'user' ? 'key' : 'inform'}
//                 color="white"
//                 textAlign={msg.sender === 'user' ? 'right' : 'left'}
//               >
//                 <Text>{msg.text}</Text>
//               </Box>
//             ))}
//             <div ref={messagesEndRef} />
//           </Box>
//           <Box mb="medium">
//             <InputText
//               placeholder="Type your important question here..."
//               width="100%"
//               value={inputValue}
//               onChange={handleInputChange}
//             />
//           </Box>
//           <Box textAlign="center" mb="medium">
//             <Button color='key' onClick={handleButtonClick}>
//               Ask Sovrn Scholar
//             </Button>
//           </Box>
//           <Space around>
//             <Drawer content="Edit this for the sidebar">
//               <Button >Sovrn Scholar Info</Button>
//             </Drawer>
//           </Space>
//         </CardContent>
//       </Card>
//     </ComponentsProvider>
//   );
// }


// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { ExtensionContext40 } from '@looker/extension-sdk-react'
// import {Heading, Box, Button, InputText,
//   ComponentsProvider, Text, IconButton, Flex} from '@looker/components'
// import { School, Science, ChatBubble, Book, ThumbUp, ThumbDown } from '@styled-icons/material'

// // Interface for chat messages
// interface Message {
//   sender: 'user' | 'system';
//   text: string;
//   name: string;
//   timestamp: string;
//   feedback?: 'up' | 'down' | null; // Optional feedback property
// }

// // Define the SovrnScholar component
// export const SovrnScholar: React.FC = () => {
//   const { coreSDK } = useContext(ExtensionContext40)
//   const [message, setMessage] = useState('')
//   const [inputValue, setInputValue] = useState('')
//   const [messages, setMessages] = useState<Message[]>([])
//   const messagesEndRef = useRef<HTMLDivElement | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [userName, setUserName] = useState<string>('User') // Store the user's name

//   useEffect(() => {
//     const getMe = async () => {
//       try {
//         const me = await coreSDK.ok(coreSDK.me())
//         setMessage(`Hello, ${me.display_name}`)
//         setUserName(`${me.display_name}`) // Set the user's name here
//       } catch (error) {
//         console.error(error)
//         setMessage('An error occurred while getting information about me!')
//       }
//     }
//     getMe()
//   }, [coreSDK])

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleButtonClick = async () => {
//     const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//     // Add user message to chat
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'user', text: inputValue, name: userName, timestamp, feedback: null },
//     ]);

//     // Set loading state
//     setIsLoading(true);

//     try {
//       // Replace this section with your Databricks logic
//       const query = await coreSDK.ok(coreSDK.create_sql_query({
//         "connection_name": "databricks_anayltics",
//         "sql": `SELECT ai_query('agents_business_intelligence-llm_data-v104_rag_v2', request => named_struct('messages', ARRAY(named_struct('role', 'user', 'content', '${inputValue}'))), returnType => 'STRUCT<choices:ARRAY<STRING>>')`,
//         "vis_config": {}
//       }));

//       let result = await coreSDK.ok(coreSDK.run_sql_query(query.slug, 'txt'));

//       // Log the result to inspect its structure
//       console.log("Raw query result:", result);

//       // Improved JSON handling
//       let resultClean = '';
//       try {
//         const parsedOuterResult = JSON.parse(result);
//         const resultParsed = JSON.parse(parsedOuterResult);

//         // Access the choices and clean up the response content
//         if (resultParsed.choices) {
//           resultClean = resultParsed.choices
//             .map((choice: any) => choice.message?.content || 'No content')
//             .join(' ')
//             .trim();
//         } else {
//           resultClean = 'No response available from the AI query.';
//         }

//       } catch (jsonError) {
//         console.warn('Failed to parse the JSON result, falling back to text handling.');

//         // Fallback if the response isn't valid JSON
//         resultClean = result
//          .replace(/ai_query\(.*?\)/, '')  // Remove 'ai_query(...)'
//           // .replace(/\)\),\s*STRUCT<choices:ARRAY<STRING>>\)\s*choices:index:\d+,message:role:assistant,content:/, '')
//          .replace(/\s+/g, ' ')           // Replace multiple spaces
//          .replace(/[\[\]{}"]/g, '')      // Remove brackets, quotes, etc.
//           .trim();                        // Trim leading/trailing whitespace
//       }

//       // Clean up for display
//       resultClean = resultClean || 'No meaningful response could be parsed.';

//       // Add the system message to the chat as "Sovrn Scholar"
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'system', text: resultClean, name: 'Sovrn Scholar', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), feedback: null },
//       ]);

//     } catch (error) {
//       console.error('Error occurred during SQL query execution:', error);

//       // Add error message to the chat as "Sovrn Scholar"
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'system', text: 'An error occurred while processing your request.', name: 'Sovrn Scholar', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), feedback: null },
//       ]);
//     } finally {
//       // Reset loading state
//       setIsLoading(false);
//     }

//     // Clear input value
//     setInputValue('');
//   };

//   // Handle thumbs up/down clicks
//   const handleFeedback = (index: number, feedback: 'up' | 'down') => {
//     setMessages((prevMessages) =>
//       prevMessages.map((msg, i) =>
//         i === index ? { ...msg, feedback } : msg
//       )
//     );
//   };

//   // Predefined questions
//   const questions = [
//     { text: 'What do our clients think of our Commerce Unified?', icon: <School size={30} /> },
//     { text: 'What is the Sovrn Exchange?', icon: <Science size={30} /> },
//     { text: 'What recommendations should I give a client who just adopted Ad Management?', icon: <ChatBubble size={30} /> },
//     { text: "Are Sovrn's business priorities aligned with customer feedback?", icon: <Book size={30} /> },
//   ];

//   return (
//     <ComponentsProvider
//       themeCustomizations={{
//         colors: { key: '#FFD42B' }, // Change to match the new yellow color
//       }}
//     >
//       <Flex
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//         backgroundColor="#DCD6CF"
//       >
//         <Box width="80%">
//           <Heading textAlign="center" pb="medium">
//             Sovrn Scholar - {message}
//           </Heading>

//           {/* Questions Buttons */}
//           <Flex justifyContent="center" alignItems="center" mb="large">
//             {questions.map((q, index) => (
//               <Box
//                 key={index}
//                 p="large"
//                 m="medium"
//                 width="200px"
//                 height="150px"
//                 backgroundColor="#FFD42B"  // Updated color
//                 borderRadius="10px"
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="center"
//                 alignItems="center"
//                 //boxShadow="0px 4px 6px rgba(0,0,0,0.1)"
//                 onClick={() => setInputValue(q.text)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 {q.icon}
//                 <Text
//                   mt="small"
//                   textAlign="center"
//                   fontWeight="bold"
//                   fontSize="small"
//                   color="black"
//                 >
//                   {q.text}
//                 </Text>
//               </Box>
//             ))}
//           </Flex>

//           {/* Message history display */}
//           <Box mb="large" height="300px" overflowY="auto" backgroundColor="white" borderRadius="8px" p="medium">
//             {messages.map((msg, index) => (
//               <Box
//                 key={index}
//                 p="medium"
//                 mb="small"
//                 borderRadius="8px"
//                 width="60%"
//                 ml={msg.sender === 'user' ? 'auto' : 0}
//                 mr={msg.sender === 'user' ? 0 : 'auto'}
//                 backgroundColor={msg.sender === 'user' ? '#FFD42B' : '#D3D3D3'} // User message: gold, System: grey
//                 color="black"
//                 textAlign={msg.sender === 'user' ? 'right' : 'left'}
//                 //boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)" // Adds depth perception
//               >
//                 {/* Display the name and timestamp */}
//                 <Text fontWeight="bold" fontSize="small">{msg.name} - {msg.timestamp}</Text>
//                 <Text fontWeight="medium" fontSize="medium">{msg.text}</Text>

//                 {/* Thumbs up/down buttons for system responses */}
//                 {msg.sender === 'system' && (
//                   <Flex justifyContent="flex-end" mt="small">
//                     <IconButton
//                       icon={<ThumbUp size={24} />}
//                       label="Thumbs Up"
//                       onClick={() => handleFeedback(index, 'up')}
//                       disabled={msg.feedback !== null}
//                       size="medium"
//                     />
//                     <IconButton
//                       icon={<ThumbDown size={24} />}
//                       label="Thumbs Down"
//                       onClick={() => handleFeedback(index, 'down')}
//                       disabled={msg.feedback !== null}
//                       ml="small"
//                       size="medium"
//                     />
//                   </Flex>
//                 )}

//                 {/* Display feedback if already provided */}
//                 {msg.feedback && (
//                   <Text fontSize="small" mt="small">
//                     {msg.feedback === 'up' ? 'You liked this response' : 'You disliked this response'}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//             <div ref={messagesEndRef} />
//           </Box>

//           {/* Input box and button */}
//           <Box mb="medium">
//             <InputText
//               placeholder="Type your important question here..."
//               width="100%"
//               value={inputValue}
//               onChange={handleInputChange}
//             />
//           </Box>

//           <Box textAlign="center">
//             <Button color="key" onClick={handleButtonClick} disabled={isLoading}>
//               {isLoading ? 'Processing...' : 'Ask the Scholar'}
//             </Button>
//           </Box>
//         </Box>
//       </Flex>
//     </ComponentsProvider>
//   );
// };

import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExtensionContext40 } from '@looker/extension-sdk-react'
import {Heading, Box, Button, InputText,
  ComponentsProvider, Text, IconButton, Flex} from '@looker/components'
import { School, Science, ChatBubble, Book, ThumbUp, ThumbDown } from '@styled-icons/material'

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
  const { coreSDK } = useContext(ExtensionContext40)
  const [message, setMessage] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState<string>('User') // Store the user's name

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

  const handleButtonClick = async () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: inputValue, name: userName, timestamp, feedback: null },
    ]);

    // Set loading state
    setIsLoading(true);

    try {
      // Replace this section with your Databricks logic
      const query = await coreSDK.ok(coreSDK.create_sql_query({
        "connection_name": "databricks_anayltics",
        "sql": `SELECT ai_query('agents_business_intelligence-llm_data-v104_rag_v2', request => named_struct('messages', ARRAY(named_struct('role', 'user', 'content', '${inputValue}'))), returnType => 'STRUCT<choices:ARRAY<STRING>>')`,
        "vis_config": {}
      }));

      let result = await coreSDK.ok(coreSDK.run_sql_query(query.slug, 'txt'));

      // Log the result to inspect its structure
      console.log("Raw query result:", result);

      // Improved JSON handling
      let resultClean = '';
      try {
        const parsedOuterResult = JSON.parse(result);
        const resultParsed = JSON.parse(parsedOuterResult);

        // Access the choices and clean up the response content
        if (resultParsed.choices) {
          resultClean = resultParsed.choices
            .map((choice: any) => choice.message?.content || 'No content')
            .join(' ')
            .trim();
        } else {
          resultClean = 'No response available from the AI query.';
        }

      } catch (jsonError) {
        console.warn('Failed to parse the JSON result, falling back to text handling.');

        // Fallback if the response isn't valid JSON
        resultClean = result
        .replace(/ai_query\(.*?\)/, '')  // Remove 'ai_query(...)'
        .replace(/STRUCT<.*?>/g, '')     // Remove 'STRUCT<...>' or similar patterns
        .replace(/choices:.*?content:/, '') // Remove "choices:..." up to "content:"
        .replace(/\s+/g, ' ')            // Replace multiple spaces with a single space
        .replace(/[\[\]{}"]/g, '')       // Remove brackets, quotes, etc.
        .trim();                         // Trim leading/trailing whitespace      
      }

      // Clean up for display
      resultClean = resultClean || 'No meaningful response could be parsed.';

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
    setInputValue('');
  };

  // Handle thumbs up/down clicks
  const handleFeedback = (index: number, feedback: 'up' | 'down') => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, i) =>
        i === index ? { ...msg, feedback } : msg
      )
    );
  };

  // Predefined questions
  const questions = [
    { text: 'What do our clients think of our Commerce Unified?', icon: <School size={30} /> },
    { text: 'What is the Sovrn Exchange?', icon: <Science size={30} /> },
    { text: 'What recommendations should I give a client who just adopted Ad Management?', icon: <ChatBubble size={30} /> },
    { text: "Are Sovrn's business priorities aligned with customer feedback?", icon: <Book size={30} /> },
  ];

  return (
    <ComponentsProvider
      themeCustomizations={{
        colors: { key: '#FFD42B' }, // Change to match the new yellow color
      }}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        backgroundColor="#DCD6CF"
      >
        <Box width="80%">
          <Heading textAlign="center" pb="medium">
            Sovrn Scholar - {message}
          </Heading>

          {/* Questions Buttons */}
          <Flex justifyContent="center" alignItems="center" mb="large">
            {questions.map((q, index) => (
              <Box
                key={index}
                p="large"
                m="medium"
                width="200px"
                height="150px"
                backgroundColor="#FFD42B"  // Updated color
                borderRadius="10px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => setInputValue(q.text)}
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

          {/* Message history display */}
          <Box mb="large" height="300px" overflowY="auto" backgroundColor="white" borderRadius="8px" p="medium">
            {messages.map((msg, index) => (
              <Box
                key={index}
                p="medium"
                mb="small"
                borderRadius="8px"
                width="60%"
                ml={msg.sender === 'user' ? 'auto' : 0}
                mr={msg.sender === 'user' ? 0 : 'auto'}
                backgroundColor={msg.sender === 'user' ? '#FFD42B' : '#D3D3D3'} // User message: gold, System: grey
                color="black"
                textAlign={msg.sender === 'user' ? 'right' : 'left'}
              >
                {/* Display the name and timestamp above the message */}
                  <Text fontWeight="bold" fontSize="small" mb="xsmall">{msg.name} - {msg.timestamp}</Text>
               <Text fontWeight="medium" fontSize="medium" mt="xsmall">{msg.text}</Text>

                {/* Thumbs up/down buttons for system responses */}
                {msg.sender === 'system' && (
                  <Flex justifyContent="flex-end" mt="small">
                    <IconButton
                      icon={<ThumbUp size={24} />}
                      label="Thumbs Up"
                      onClick={() => handleFeedback(index, 'up')}
                      disabled={msg.feedback !== null}
                      size="medium"
                    />
                    <IconButton
                      icon={<ThumbDown size={24} />}
                      label="Thumbs Down"
                      onClick={() => handleFeedback(index, 'down')}
                      disabled={msg.feedback !== null}
                      ml="small"
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

          {/* Input box and button */}
          <Box mb="medium">
            <InputText
              placeholder="Type your important question here..."
              width="100%"
              value={inputValue}
              onChange={handleInputChange}
            />
          </Box>

          <Box textAlign="center">
            <Button color="key" onClick={handleButtonClick} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Ask the Scholar'}
            </Button>
          </Box>
        </Box>
      </Flex>
    </ComponentsProvider>
  );
};
