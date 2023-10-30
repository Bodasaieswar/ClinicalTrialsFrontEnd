import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Layout from '../components/Layout';
import ClinicalTrialDetails from '../components/ClinicalTrialDetails';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: 'trial/:NCTId',
				element: <ClinicalTrialDetails />,
			},
		],
	},
]);

export default router;
