import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Layout from '../components/Layout';
import ClinicalTrialDetails from '../components/ClinicalTrialDetails';
import Error404 from '../components/Error404';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error404 />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: 'trial/:protocolId/:nctNo',
				element: <ClinicalTrialDetails />,
			},
		],
	},
]);

export default router;
