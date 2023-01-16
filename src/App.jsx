import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import SinglePost from './components/SinglePost/SinglePost'

function App() {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
