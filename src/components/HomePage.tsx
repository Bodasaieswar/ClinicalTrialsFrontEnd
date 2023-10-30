import React from 'react';
import ClinicalTrialsPage from './ClinicalTrialsPage';
import ClinicalTrialDefination from './ClinicalTrialDefination';

const HomePage: React.FC = () => {
	return (
		<>
			<ClinicalTrialDefination />
			<ClinicalTrialsPage />
		</>
	);
};

export default HomePage;
