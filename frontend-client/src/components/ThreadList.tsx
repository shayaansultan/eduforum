import React, { useEffect, useState } from 'react';
import ThreadCard from './ThreadCard'; // adjust the import path as needed
import { useColorScheme } from '@mui/joy/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton, Stack } from '@mui/joy';
import './Thread'

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
        <DarkModeIcon />
    </IconButton>
  );
}




const ThreadList = () => {
 const [threads, setThreads] = useState<Thread[]>([]);

//  useEffect(() => {
//    fetch('/api/threads') // replace with your actual API endpoint
//      .then(response => response.json())
//      .then(data => setThreads(data));
//  }, []);



 useEffect(() => {
   setTimeout(() => {
     setThreads([
       {
         id: '1',
         title: 'First thread',
         subtitle: 'This is the first thread',
         commentCount: 10,
         createdAt: new Date().toISOString(),
       },
       {
         id: '2',
         title: 'Second thread',
         subtitle: 'This is the second thread',
         commentCount: 20,
         createdAt: new Date().toISOString(),
       },
       // add more fake threads as needed
     ]);
   }, 1000); // simulate a 1 second delay
 }, []);

 return (
   <div>
     {threads.map((thread: any) => (
       <ThreadCard
          key={thread.id}
          id={thread.id}
          title={thread.title}
          subtitle={thread.subtitle}
          commentCount={thread.commentCount}
          createdAt={new Date(thread.createdAt).toLocaleString()}
       />
     ))}
        <ModeToggle />
   </div>
 );
};

export default ThreadList;
