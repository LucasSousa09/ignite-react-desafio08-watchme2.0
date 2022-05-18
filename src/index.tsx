import { render } from 'react-dom'

import { App } from './App'

import { queryClient } from './services/api'
import { QueryClientProvider  } from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'

render(
<QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools/>
</QueryClientProvider>
, document.getElementById('root'))