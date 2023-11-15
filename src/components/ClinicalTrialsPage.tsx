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
	Spacer,
	Badge,
} from '@chakra-ui/react';
import { BsFillPeopleFill } from 'react-icons/bs';
import useClinicalTrials from '../hooks/useClinicalTrials';
import FormateAgeSentence from './FormateAgeSentence';
import { useEffect, useState } from 'react';
import ClinicalTrialsPageSkeleton from './ClinicalTrialsPageSkeleton';
import { Link } from 'react-router-dom';

interface ShowMoreState {
	[key: string]: boolean;
}

const ITEMS_PER_PAGE = 20;

const ClinicalTrialsPage = () => {
	const { data, isLoading, error } = useClinicalTrials();
	const [currentPage, setCurrentPage] = useState(1);
	const [showMore, setShowMore] = useState<ShowMoreState>({});
	const [searchTerm, setSearchTerm] = useState('');

	const filteredTrials =
		data?.filter((trial) =>
			trial.OfficialTitle?.toLowerCase().includes(
				searchTerm.toLowerCase(),
			),
		) || [];

	useEffect(() => {
		setCurrentPage(1); // Reset to the first page whenever searchTerm changes
	}, [searchTerm]);

	const toggleShowMore = (protocolId: string) => {
		setShowMore((prevState) => ({
			...prevState,
			[protocolId]: !prevState[protocolId],
		}));
	};

	const highlightSearchTerm = (text: string) => {
		const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
		return parts.map((part, index) =>
			part.toLowerCase() === searchTerm.toLowerCase() ? (
				<span
					key={index}
					style={{ backgroundColor: '#fbdde0' }}
				>
					{part}
				</span>
			) : (
				part
			),
		);
	};

	if (error) return <p>Error: {error.message}</p>;
	if (isLoading) return <ClinicalTrialsPageSkeleton />;

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const displayedTrials = filteredTrials.slice(startIndex, endIndex);

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
					explore {filteredTrials.length} studies
				</Text>
			</Stack>
			<Stack spacing={4}>
				{displayedTrials.map((trial) => {
					const {
						protocolId,
						nctNo,
						OfficialTitle,
						MinimumAge,
						MaximumAge,
						BriefSummary,
						protocolStatus,
					} = trial;
					return (
						<Box
							key={protocolId}
							p={4}
							borderWidth="1px"
						>
							<Link to={`/trial/${protocolId}`}>
								<Text
									fontSize="lg"
									mb={'2px'}
								>
									{OfficialTitle &&
										highlightSearchTerm(OfficialTitle)}
								</Text>
							</Link>
							<Box>
								<HStack>
									<Icon as={BsFillPeopleFill} />
									<Text
										fontSize={'xs'}
										mb={'3px'}
										backgroundColor={'whiteAlpha.300'}
									>
										{FormateAgeSentence(
											MinimumAge,
											MaximumAge,
										)}
									</Text>
									{protocolStatus &&
									protocolStatus === 'OPEN TO ACCRUAL' ? (
										<Badge
											variant="subtle"
											colorScheme="green"
										>
											Recruiting
										</Badge>
									) : (
										<Badge
											variant="subtle"
											colorScheme="red"
										>
											Not Recruiting
										</Badge>
									)}
								</HStack>
							</Box>
							<Text fontSize="sm">
								{showMore[protocolId]
									? BriefSummary
									: `${BriefSummary?.substring(0, 250)}`}
								<Button
									colorScheme="red"
									variant="link"
									onClick={() => toggleShowMore(protocolId)}
								>
									{showMore[protocolId]
										? '..show less'
										: '..show more'}
								</Button>
							</Text>
						</Box>
					);
				})}
				<Box
					mt={4}
					display="flex"
					justifyContent="space-between"
				>
					<Button
						isDisabled={currentPage === 1}
						colorScheme={currentPage === 1 ? 'gray' : 'red'}
						onClick={() =>
							setCurrentPage((prev) => Math.max(prev - 1, 1))
						}
						as={'b'}
					>
						Previous
					</Button>
					<Text as="b">
						Page {currentPage} of{' '}
						{Math.ceil(filteredTrials.length / ITEMS_PER_PAGE)}
					</Text>
					<Button
						isDisabled={
							currentPage * ITEMS_PER_PAGE >=
							filteredTrials.length
						}
						colorScheme={
							currentPage * ITEMS_PER_PAGE >=
							filteredTrials.length
								? 'gray'
								: 'red'
						}
						onClick={() =>
							setCurrentPage((prev) =>
								Math.min(
									prev + 1,
									Math.ceil(
										filteredTrials.length / ITEMS_PER_PAGE,
									),
								),
							)
						}
						as={'b'}
					>
						Next
					</Button>
				</Box>
				<Spacer />
			</Stack>
		</>
	);
};

export default ClinicalTrialsPage;
