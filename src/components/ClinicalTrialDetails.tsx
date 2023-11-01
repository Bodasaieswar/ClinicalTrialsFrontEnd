import { useNavigate, useParams } from 'react-router-dom';
import useClinicalTrialDetails from '../hooks/useClinicalTrialDetails';
import {
	VStack,
	Text,
	Heading,
	Divider,
	Box,
	HStack,
	Icon,
	Badge,
	Container,
	Link,
	ListItem,
	UnorderedList,
	Button,
} from '@chakra-ui/react';
import FormateAgeSentence from './FormateAgeSentence';
import { BsFillPeopleFill, BsCalendar2CheckFill } from 'react-icons/bs';
import { FaLocationDot, FaUserDoctor } from 'react-icons/fa6';
import { GrStatusGood } from 'react-icons/gr';
import { AiOutlineLink } from 'react-icons/ai';
import ClinicalTrialsDetailsSkeleton from './ClinicalTrialsDetailsSkeleton';

const ClinicalTrialDetails = () => {
	const navigate = useNavigate();
	const { NCTId } = useParams();
	const { data, isLoading, error } = useClinicalTrialDetails(NCTId);

	if (error) return <p>Error: {error.message}</p>;
	if (isLoading) return <ClinicalTrialsDetailsSkeleton />;

	const extractCriteria = (type: string) => {
		// Check if data and EligibilityCriteria are defined
		if (!data || !data.EligibilityCriteria) {
			return [];
		}

		const splitData = data.EligibilityCriteria.split('Exclusion');

		// Check if we successfully split the data into at least two parts
		if (splitData.length < 2) {
			return [];
		}

		let criteria;

		if (type === 'Inclusion') {
			criteria = splitData[0];
		} else if (type === 'Exclusion') {
			criteria = splitData[1];
		} else {
			return [];
		}

		const criteriaList = criteria
			.split('\n\n')
			.filter((item) => item.trim() !== '');

		if (type === 'Inclusion') {
			criteriaList.shift(); // Removing the "Inclusion Criteria:" header
		}

		if (type === 'Exclusion') {
			criteriaList.shift(); // Removing the "Exclusion Criteria:" header
		}

		return criteriaList;
	};

	const inclusionCriteria = extractCriteria('Inclusion');
	const exclusionCriteria = extractCriteria('Exclusion');

	const formatDate = (dateString: string) => {
		const options = { month: 'long', year: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const facilities = data?.LocationFacility.split(',');
	const statuses = data?.LocationStatus.split(',');
	const cities = data?.LocationCity.split(',');
	const states = data?.LocationState.split(',');
	const countries = data?.LocationCountry.split(',');
	const zip = data?.LocationZip.split(',');

	return (
		<>
			<VStack
				align={'stretch'}
				spacing={4}
			>
				<Heading
					as="h2"
					size="xl"
					mb={'1px'}
				>
					{data?.BriefTitle}
				</Heading>
				<Divider />
				<Box>
					<HStack>
						<Icon
							as={BsFillPeopleFill}
							mr={4}
						/>
						<Text as="b">
							{FormateAgeSentence(
								data?.MinimumAge,
								data?.MaximumAge,
							)}
						</Text>
					</HStack>
				</Box>
				<Box>
					<HStack>
						<Icon
							as={FaLocationDot}
							mr={4}
						/>
						<Text m={0}>at {data?.OfficialFacility}</Text>
					</HStack>
				</Box>
				<Box>
					<HStack>
						<Icon
							as={BsCalendar2CheckFill}
							mr={4}
						/>
						<Text m={0}>
							study started{' '}
							{data?.StartDate && formatDate(data?.StartDate)}{' '}
							<span>
								estimated completion{' '}
								{data?.CompletionDate &&
									formatDate(data?.CompletionDate)}
							</span>
						</Text>
					</HStack>
				</Box>
				<Box>
					<HStack>
						<Icon
							as={FaUserDoctor}
							mr={4}
						/>
						<Text m={0}>by {data?.OverallOfficialName}</Text>
					</HStack>
				</Box>
				<Box>
					<HStack>
						<Icon
							as={GrStatusGood}
							color="green.100"
							mr={4}
						/>
						<Badge colorScheme="green">
							<Text m={0}>{data?.OfficialStatus}</Text>
						</Badge>
					</HStack>
				</Box>
				<Divider m={0} />
				<Heading
					as={'h5'}
					mt={0}
					mb={1}
				>
					Description
				</Heading>

				<Box>
					<Text
						pl={'30px'}
						fontSize={'lg'}
						as={'b'}
					>
						Summary
					</Text>
					<Text
						pl={'50px'}
						mb={1}
					>
						{data?.BriefSummary}
					</Text>
				</Box>
				<Box>
					<Text
						pl={'30px'}
						fontSize={'lg'}
						as={'b'}
					>
						Official Title
					</Text>
					<Text
						pl={'50px'}
						mb={1}
					>
						{data?.OfficialTitle}
					</Text>
				</Box>
				<Box>
					<Text
						pl={'30px'}
						fontSize={'lg'}
						as={'b'}
					>
						Keywords
					</Text>
					<Text
						pl={'50px'}
						mb={1}
					>
						{data?.Conditions}
					</Text>
				</Box>
				<Divider m={0} />
				<Heading
					as={'h5'}
					mt={0}
					mb={1}
				>
					Eligibility
				</Heading>
				{inclusionCriteria.length === 0 &&
					exclusionCriteria.length === 0 && (
						<Text pl={'30px'}>{data?.EligibilityCriteria}</Text>
					)}

				{inclusionCriteria.length > 0 && (
					<>
						<Text fontSize={'lg'}>
							<span
								role="img"
								aria-label="checkmark"
							>
								✔️
							</span>{' '}
							YOU CAN JOIN IF...
						</Text>{' '}
						<UnorderedList pl={'30px'}>
							{inclusionCriteria.map((item, index) => (
								<ListItem key={index}>{item}</ListItem>
							))}
						</UnorderedList>
					</>
				)}

				{exclusionCriteria.length > 0 && (
					<>
						<Text fontSize={'lg'}>
							<span
								role="img"
								aria-label="crossmark"
							>
								❌
							</span>{' '}
							YOU CAN'T JOIN IF...
						</Text>
						<UnorderedList pl={'30px'}>
							{exclusionCriteria.map((item, index) => (
								<ListItem key={index}>{item}</ListItem>
							))}
						</UnorderedList>
					</>
				)}

				<Divider m={0} />
				<Heading
					as={'h5'}
					mt={0}
					mb={1}
				>
					Locations
				</Heading>

				<UnorderedList
					pl={'30px'}
					mb={0}
				>
					{facilities?.map((facility, index) => (
						<ListItem
							key={facility}
							mb={0}
						>
							<Box m={0}>
								<Text mb={0}>
									{facility}{' '}
									<Badge
										color={
											statuses &&
											statuses[index] == 'Recruiting'
												? 'green'
												: 'default'
										}
									>
										{statuses && statuses[index]}
									</Badge>
								</Text>
								<Text mb={2}>
									{cities && cities[index]},{' '}
									{(states && states[index]) || 'N/A'},{' '}
									{zip && zip[index]},{' '}
									{countries && countries[index]}
								</Text>
							</Box>
						</ListItem>
					))}
				</UnorderedList>

				<Divider m={0} />
				<Heading
					as={'h5'}
					mt={0}
					mb={1}
				>
					Lead Scientist at {data?.OfficialFacility}
				</Heading>
				<Text>{data?.OfficialPI}</Text>
				<Divider m={0} />
				<Heading
					as={'h6'}
					mt={0}
				>
					Details
				</Heading>
				<Container ml={25}>
					<Box
						as="dl"
						display="flex"
						flexDirection="column"
					>
						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Status
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								accepting new patients
							</Text>
						</Box>

						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Start Date
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								{data?.StartDate && formatDate(data?.StartDate)}
							</Text>
						</Box>

						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Completion Date
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								{data?.CompletionDate &&
									formatDate(data?.CompletionDate)}
							</Text>
						</Box>

						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Sponsor
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								{data?.LeadSponsorName}
							</Text>
						</Box>

						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								ID
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								<Icon as={AiOutlineLink} />
								<Link
									href={`https://clinicaltrials.gov/study/${data?.NCTId}`}
									isExternal
									color={'blue.500'}
									pl={'2'}
								>
									{data?.NCTId}
								</Link>
							</Text>
						</Box>

						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Phase
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								{data?.Phase}
							</Text>
						</Box>

						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Study Type
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								{data?.StudyType}
							</Text>
						</Box>

						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Participants
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								Expecting {data?.EnrollmentCount} study
								participants
							</Text>
						</Box>

						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Last Updated
							</Text>
							<Text
								as="dd"
								flex="9"
							>
								{data?.LastUpdateSubmitDate &&
									formatDate(data?.LastUpdateSubmitDate)}
							</Text>
						</Box>
					</Box>
				</Container>
				<Box ml={1}>
					<Button
						colorScheme="gray"
						mb={3}
						// w={'10px'}
						onClick={() => {
							navigate('/');
						}}
					>
						Back
					</Button>
				</Box>
			</VStack>
		</>
	);
};

export default ClinicalTrialDetails;
