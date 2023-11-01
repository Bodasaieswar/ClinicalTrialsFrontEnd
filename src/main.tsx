import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './routing/router';
import { RouterProvider } from 'react-router-dom';
import ms from 'ms';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			staleTime: ms('24h'),
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>,
);
