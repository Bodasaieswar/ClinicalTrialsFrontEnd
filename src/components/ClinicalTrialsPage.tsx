import {
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	List,
	ListItem,
	Spinner,
	Stack,
	Button,
} from '@chakra-ui/react';
import useClinicalTrials from '../hooks/useClinicalTrials';
import { useState } from 'react';

const ClinicalTrialsPage = () => {
	const { data, isLoading, error } = useClinicalTrials();
	const [showMore, setShowMore] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	if (error) return <p>Error: {error.message}</p>;
	if (isLoading) return <Spinner />;

	const filteredTrials = data?.filter((trial) =>
		trial.OfficialTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const highlightSearchTerm = (text: String) => {
		const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
		return (
			<>
				{parts.map((part, index) =>
					part.toLowerCase() === searchTerm.toLowerCase() ? (
						<span
							key={index}
							style={{
								backgroundColor: '#fbdde0',
							}}
						>
							{part}
						</span>
					) : (
						part
					),
				)}
			</>
		);
	};

	return (
		<>
			<Text fontSize="3xl">What is a Clinical Trial?</Text>
			<Text fontSize="xl">
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
			<Stack spacing={4}>
				<InputGroup size="lg">
					<InputLeftAddon children="Search Trials" />
					<Input
						type="string"
						placeholder="e.g. Heart, Lymphoma, Kidney"
						size="lg"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</InputGroup>
				<Text
					size="sm"
					color="blue.800"
					fontWeight="500"
				>
					explore {data?.length || 0} studies
				</Text>
			</Stack>
			<List>
				{filteredTrials?.map((ClinicalTrial) => (
					<ListItem key={ClinicalTrial.NCTId}>
						<Text fontSize="2xl">
							{ClinicalTrial.OfficialTitle &&
								highlightSearchTerm(
									ClinicalTrial.OfficialTitle,
								)}
						</Text>
						<Text fontSize="lg">
							{showMore
								? ClinicalTrial.BriefSummary
								: `${ClinicalTrial.BriefSummary?.substring(
										0,
										250,
								  )}`}
							<Button
								colorScheme="red"
								variant="link"
								onClick={() => setShowMore(!showMore)}
							>
								{showMore ? '..show less' : '...show more'}
							</Button>
						</Text>
						<hr />
					</ListItem>
				))}
			</List>
		</>
	);
};

export default ClinicalTrialsPage;
