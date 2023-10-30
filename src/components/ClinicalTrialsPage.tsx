import {
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	Stack,
	Button,
	Box,
	Icon,
	HStack,
} from '@chakra-ui/react';
import { BsFillPeopleFill } from 'react-icons/bs';
import useClinicalTrials from '../hooks/useClinicalTrials';
import FormateAgeSentence from './FormateAgeSentence';
import { useState } from 'react';
import ClinicalTrialsPageSkeleton from './ClinicalTrialsPageSkeleton';
import { Link } from 'react-router-dom';

interface ShowMoreState {
	[key: string]: boolean;
}

const ClinicalTrialsPage = () => {
	const { data, isLoading, error } = useClinicalTrials();
	const [showMore, setShowMore] = useState<ShowMoreState>({});
	const [searchTerm, setSearchTerm] = useState('');

	if (error) return <p>Error: {error.message}</p>;
	if (isLoading) return <ClinicalTrialsPageSkeleton />;

	const filteredTrials = data?.filter((trial) =>
		trial.OfficialTitle?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const toggleShowMore = (NCTId: string) => {
		setShowMore((prevState) => ({
			...prevState,
			[NCTId]: !prevState[NCTId],
		}));
	};

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
			{filteredTrials?.map((ClinicalTrial) => (
				<Box
					p={4}
					borderWidth="1px"
					key={ClinicalTrial.NCTId}
				>
					<Link to={`/trial/${ClinicalTrial.NCTId}`}>
						<Text
							fontSize="lg"
							mb={'2px'}
						>
							{ClinicalTrial.OfficialTitle &&
								highlightSearchTerm(
									ClinicalTrial.OfficialTitle,
								)}
						</Text>
					</Link>
					<Box>
						<HStack>
							<Icon as={BsFillPeopleFill} />
							{FormateAgeSentence(
								ClinicalTrial.MinimumAge,
								ClinicalTrial.MaximumAge,
							)}
						</HStack>
					</Box>
					<Text fontSize="sm">
						{showMore[ClinicalTrial.NCTId]
							? ClinicalTrial.BriefSummary
							: `${ClinicalTrial.BriefSummary?.substring(
									0,
									250,
							  )}`}
						<Button
							colorScheme="red"
							variant="link"
							onClick={() => toggleShowMore(ClinicalTrial.NCTId)}
						>
							{showMore[ClinicalTrial.NCTId]
								? '..show less'
								: '..show more'}
						</Button>
					</Text>
				</Box>
			))}
		</>
	);
};

export default ClinicalTrialsPage;
