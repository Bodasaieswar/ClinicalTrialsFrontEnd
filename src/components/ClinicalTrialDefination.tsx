import { Text } from '@chakra-ui/react';

const ClinicalTrialDefination = () => {
	return (
		<>
			<Text
				fontSize="lg"
				fontWeight={500}
			>
				What is a Clinical Trial?
			</Text>
			<Text fontSize="md">
				The US Department of Health and Human Services defines a
				clinical trial as a research study conducted to evaluate a
				medical procedure or medical product, such as a drug. Not all
				studies at the University of Arizona involve drugs or
				interventions; some studies use surveys or evaluate medical
				records to find new and better ways to help people. Other
				studies recruit healthy subjects, or controls, to better
				evaluate and compare their results with those of non-healthy
				subjects.
			</Text>
			<hr />
		</>
	);
};

export default ClinicalTrialDefination;
