import React, { useContext, useEffect, useRef, useState } from 'react'
import { ExtensionContext40 } from '@looker/extension-sdk-react'
import {
  Card,
  CardContent,
  Heading,
  Box,
  Button,
  InputText,
  Space,
  ComponentsProvider,
  Text,
  ButtonOutline,
  IconButton,
  Icon,
  Drawer,
} from '@looker/components'

/**
 * A simple component that uses the Looker SDK through the extension sdk to display a customized hello message.
 */
interface Message {
  sender: 'user' | 'system';
  text: string;
}

export const SovrnScholar: React.FC = () => {
  const { coreSDK } = useContext(ExtensionContext40)
  const [message, setMessage] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const getMe = async () => {
      try {
        const me = await coreSDK.ok(coreSDK.me())
        setMessage(`Hello, ${me.display_name}`)
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
    console.log('Creating SQL query...')
    
    // Adding the user input to the chatbox before sending the query
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: inputValue },
    ]);
    
    try {
      const query = await coreSDK.ok(coreSDK.create_sql_query({
        "connection_name": "databricks_anayltics",
        // "sql": "SELECT 1",  // Simple query for testing
        "sql":`SELECT ai_query('agents_business_intelligence-llm_data-v104_rag_v2', request => named_struct('messages', ARRAY(named_struct('role', 'user', 'content', '${inputValue}'))), returnType => 'STRUCT<choices:ARRAY<STRING>>')`,
        "vis_config": {}
      }))
  
      if (query && query.slug) {
        console.log(query)
        console.log('Query slug:'+ query.slug)
        
        // Simulate querying results from Looker
        let result = await coreSDK.ok(coreSDK.run_sql_query(
          query.slug, 'txt'))

        console.log('query completed')
        
        // Parse the result and display it in the chatbox
        // const responseText = result?.[0]?.choices?.[0]?.toString() || 'No response available';
        // console.log(result?[0]?.choices?.[0]?.toString()
        // const responseText = result?[0]?.choices?.[0]?.toString()
        console.log(result)
        const matches = result.match(/"([^"]*)"/g);
        const result_clean = matches.map(match => match.replace(/"/g, '')).join(' ');

        const responseText = result_clean || 'No response available';
        

        
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'system', text: responseText },
        ]);
      } else {
        console.log("fail");
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'system', text: 'An error occurred, please try again.' },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'An error occurred while processing your request.' },
      ]);
    }
    
    setInputValue('');
  };

  return (
    <ComponentsProvider
      themeCustomizations={{
        colors: { key: '#1A73E8' },
      }}
    >
      <Card raised width="70%" m="auto">
        <CardContent>
          <Heading textAlign="center" pb="medium">
            Sovrn Scholar - {message}
          </Heading>
          <Box mb="medium" height="600px" overflowY="auto">
            {messages.map((msg, index) => (
              <Box
                key={index}
                p="medium"
                mb="small"
                borderRadius="8px"
                width="60%"
                ml={msg.sender === 'user' ? 'auto' : 0}
                mr={msg.sender === 'user' ? 0 : 'auto'}
                backgroundColor={msg.sender === 'user' ? 'key' : 'inform'}
                color="white"
                textAlign={msg.sender === 'user' ? 'right' : 'left'}
              >
                <Text>{msg.text}</Text>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <Box mb="medium">
            <InputText
              placeholder="Type your important question here..."
              width="100%"
              value={inputValue}
              onChange={handleInputChange}
            />
          </Box>
          <Box textAlign="center" mb="medium">
            <Button color='key' onClick={handleButtonClick}>
              Ask Sovrn Scholar
            </Button>
          </Box>
          <Space around>
            <Drawer content="Edit this for the sidebar">
              <Button >Sovrn Scholar Info</Button>
            </Drawer>
          </Space>
        </CardContent>
      </Card>
    </ComponentsProvider>
  );
}