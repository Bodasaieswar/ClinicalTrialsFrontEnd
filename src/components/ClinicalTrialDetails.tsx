import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
	Stack,
} from '@chakra-ui/react';
import FormateAgeSentence from './FormateAgeSentence';
import { BsFillPeopleFill, BsCalendar2CheckFill } from 'react-icons/bs';
import { FaLocationDot, FaUserDoctor, FaBan } from 'react-icons/fa6';
import { RxDoubleArrowDown } from 'react-icons/rx';
import { GrStatusGood } from 'react-icons/gr';
import { AiOutlineLink } from 'react-icons/ai';
import { IoMdCheckboxOutline } from 'react-icons/io';
import ClinicalTrialsDetailsSkeleton from './ClinicalTrialsDetailsSkeleton';
import useClinicalTrialLocation from '../hooks/useClinicalTrialLocation';
import SomethingWentWrong from './SomethingWentWrong';
import ClinicalTrialLocation from '../entities/ClinicalTrialLocation';

const ClinicalTrialDetails = () => {
	const navigate = useNavigate();
	const { protocolId, nctNo } = useParams();
	const [displayCount, setDisplayCount] = useState(5); // Start with 5 items

	const { data, isLoading, error } = useClinicalTrialDetails(protocolId);
	const [locationData, setLocationData] = useState<
		ClinicalTrialLocation[] | undefined
	>(undefined);

	useEffect(() => {
		if (nctNo && nctNo !== 'NCT00000000') {
			const fetchData = async () => {
				const { data: TraillocationData } =
					await useClinicalTrialLocation(nctNo);
				setLocationData(TraillocationData);
			};

			fetchData();
		}
	}, [nctNo]); // Re-run the effect if nctNo changes
	// Function to handle 'Show More' button click
	const showMore = () => {
		setDisplayCount((prevCount: number) => prevCount + 5); // Show 5 more items
	};

	if (error) return <SomethingWentWrong />;
	if (isLoading) return <ClinicalTrialsDetailsSkeleton />;

	const extractCriteria = (type: string) => {
		// Check if data and EligibilityCriteria are defined
		if (
			!data ||
			!data.EligibilityCriteria ||
			data.EligibilityCriteria === 'None'
		) {
			return [];
		}

		const criteria = data.EligibilityCriteria;

		if (type === 'Inclusion') {
			// Extract only inclusion criteria
			const inclusionPart = criteria.match(
				/Inclusion Criteria:([\s\S]*?)(?:Exclusion Criteria:|$)/i,
			);
			if (inclusionPart && inclusionPart[1]) {
				const inclusionCriteriaText = inclusionPart[1].trim();
				const inclusionCriteriaList = inclusionCriteriaText
					.split(';')
					.filter((item) => item.trim() !== '');
				return inclusionCriteriaList;
			}
		} else if (type === 'Exclusion') {
			// Extract only exclusion criteria
			const exclusionPart = criteria.match(
				/Exclusion Criteria:([\s\S]*)/i,
			);
			if (exclusionPart && exclusionPart[1]) {
				const exclusionCriteriaText = exclusionPart[1].trim();
				const exclusionCriteriaList = exclusionCriteriaText
					.split(';')
					.filter((item) => item.trim() !== '');
				return exclusionCriteriaList;
			}
		} else if (type === 'Both') {
			// Extract both inclusion and exclusion criteria
			const inclusionPart = criteria.match(
				/Inclusion Criteria:([\s\S]*?)(?:Exclusion Criteria:|$)/i,
			);
			const exclusionPart = criteria.match(
				/Exclusion Criteria:([\s\S]*)/i,
			);

			const inclusionCriteriaList =
				inclusionPart && inclusionPart[1]
					? inclusionPart[1]
							.trim()
							.split('\n\n')
							.filter((item) => item.trim() !== '')
					: [];

			const exclusionCriteriaList =
				exclusionPart && exclusionPart[1]
					? exclusionPart[1]
							.trim()
							.split('\n\n')
							.filter((item) => item.trim() !== '')
					: [];

			return {
				inclusion: inclusionCriteriaList,
				exclusion: exclusionCriteriaList,
			};
		}

		return [];
	};

	const inclusionCriteria = extractCriteria('Inclusion');
	const exclusionCriteria = extractCriteria('Exclusion');

	const formatDate = (dateString: Date) => {
		const options: Intl.DateTimeFormatOptions = {
			month: 'long',
			year: 'numeric',
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const shouldRenderNctNo = data?.nctNo && data.nctNo !== 'NCT00000000';
	return (
		<VStack
			align={'stretch'}
			spacing={4}
		>
			<Heading
				as="h2"
				size="xl"
				mb={'1px'}
				color={'blackAlpha.900'}
			>
				{data?.BriefTitle ? data?.BriefTitle : data?.title}
			</Heading>
			<Divider />
			<Box>
				<HStack>
					<Icon
						as={BsFillPeopleFill}
						mr={4}
						color={'blue.500'}
					/>
					<Text m={0}>
						{FormateAgeSentence(
							data?.age,
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
						color={'blue.500'}
					/>
					<Text m={0}>at {data?.institution}</Text>
				</HStack>
			</Box>
			<Box>
				<HStack>
					<Icon
						as={BsCalendar2CheckFill}
						mr={4}
						color={'blue.500'}
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
			<Stack spacing={0}>
				<Box>
					<HStack>
						<Icon
							as={FaUserDoctor}
							mr={4}
							color={'blue.500'}
						/>
						<Text
							m={0}
							as="b"
						>
							{data?.poc}
						</Text>
					</HStack>
				</Box>
				<Box m={0}>
					<HStack
						spacing={0}
						pl={10}
					>
						<Text
							m={0}
							color={'gray.500'}
							fontSize={'xs'}
							as={'b'}
						>
							{data?.poc_role} |
						</Text>

						<Link
							href={`mailto:${data?.poc_email}`}
							color="gray.500"
							fontSize={'xs'}
							m={0}
							pl={2}
						>
							{data?.poc_email}
						</Link>
					</HStack>
				</Box>
			</Stack>
			<Box>
				<HStack>
					<Icon
						as={GrStatusGood}
						color={'green.200'}
						mr={4}
					/>
					<Badge colorScheme="green">
						<Text m={0}>{data?.protocolStatus}</Text>
					</Badge>
				</HStack>
			</Box>
			<Divider m={0} />
			<Heading
				as={'h2'}
				mt={0}
				mb={1}
				size={'lg'}
			>
				Description
			</Heading>

			{data?.BriefSummary && (
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
			)}
			{data?.objectives && (
				<Box>
					<>
						<Text
							pl={'30px'}
							fontSize={'lg'}
							as={'b'}
						>
							Objective
						</Text>
						<UnorderedList
							pl={'50px'}
							mb={1}
						>
							{data.objectives
								.split(';')
								.map((objective, index) => (
									<ListItem key={index}>
										{objective.trim()}
									</ListItem>
								))}
						</UnorderedList>
					</>
				</Box>
			)}
			{data?.OfficialTitle && (
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
			)}
			{data?.KeywordList && (
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
						{data?.KeywordList}
					</Text>
				</Box>
			)}
			<Divider m={0} />
			<Heading
				as={'h5'}
				mt={0}
				mb={1}
			>
				Eligibility
			</Heading>
			{Array.isArray(inclusionCriteria) &&
				inclusionCriteria.length > 0 && (
					<>
						<HStack>
							<Icon
								as={IoMdCheckboxOutline}
								color={'green.500'}
								boxSize={8}
							/>
							<Text
								fontSize={'lg'}
								mb={0}
								textDecoration={'underline'}
								as={'b'}
							>
								YOU CAN JOIN IF...
							</Text>
						</HStack>
						<UnorderedList pl={'30px'}>
							{inclusionCriteria.map((item, index) => (
								<ListItem key={index}>{item}</ListItem>
							))}
						</UnorderedList>
					</>
				)}

			{Array.isArray(exclusionCriteria) &&
				exclusionCriteria.length > 0 && (
					<>
						<HStack>
							<Icon
								as={FaBan}
								color={'red.600'}
								boxSize={8}
							/>
							<Text
								fontSize={'lg'}
								mb={0}
								as={'b'}
								textDecoration={'underline'}
							>
								YOU CAN'T JOIN IF...
							</Text>
						</HStack>

						<UnorderedList pl={'30px'}>
							{exclusionCriteria.map((item, index) => (
								<ListItem key={index}>{item}</ListItem>
							))}
						</UnorderedList>
					</>
				)}

			{(!Array.isArray(inclusionCriteria) ||
				inclusionCriteria.length === 0) &&
				(!Array.isArray(exclusionCriteria) ||
					exclusionCriteria.length === 0) && (
					<Text pl={'30px'}>{data?.EligibilityCriteria}</Text>
				)}

			<Divider m={0} />
			{locationData && (
				<>
					<Heading
						as={'h5'}
						mt={0}
						mb={1}
					>
						Locations
					</Heading>

					<UnorderedList
						pl="30px"
						mb={0}
					>
						{locationData
							?.slice(0, displayCount)
							.map((facility) => (
								<ListItem
									key={facility.id}
									mb={0}
								>
									<Box m={0}>
										<Text mb={0}>
											{facility.LocationFacility}{' '}
											<Badge
												color={
													facility.LocationStatus ===
													'Recruiting'
														? 'green'
														: 'default'
												}
											>
												{facility.LocationStatus ??
													'N/A'}
											</Badge>
										</Text>
										<Text mb={2}>
											{facility.LocationCity ?? 'N/A'},{' '}
											{facility.LocationState ?? 'N/A'},{' '}
											{facility.LocationZip ?? 'N/A'},{' '}
											{facility.LocationCountry ?? 'N/A'}
										</Text>
									</Box>
								</ListItem>
							))}
					</UnorderedList>
					{locationData && displayCount < locationData.length && (
						<Button
							colorScheme="red"
							variant="link"
							onClick={showMore}
						>
							<Text
								pr={2}
								mb={0}
							>
								Show More
							</Text>
							<Icon
								as={RxDoubleArrowDown}
								color={'red.500'}
							/>
						</Button>
					)}
					<Divider m={0} />
				</>
			)}

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

					{data?.LeadSponsorName && (
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
					)}
					{data?.department && (
						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Department
							</Text>

							<Text
								as="dd"
								flex="9"
							>
								{data?.department}
							</Text>
						</Box>
					)}
					{data?.scope && (
						<Box display="flex">
							<Text
								as="dt"
								flex="3"
								textAlign="right"
								mr={4}
							>
								Scope
							</Text>

							<Text
								as="dd"
								flex="9"
							>
								{data?.scope}
							</Text>
						</Box>
					)}

					{shouldRenderNctNo && (
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
									href={`https://clinicaltrials.gov/study/${data?.nctNo}`}
									isExternal
									color={'blue.500'}
									pl={'2'}
								>
									{data?.nctNo}
								</Link>
							</Text>
						</Box>
					)}

					{data?.Phase && (
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
					)}

					{data?.StudyType && (
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
					)}

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
							Expecting{' '}
							{data?.EnrollmentCount
								? data?.EnrollmentCount
								: data?.protocolTargetAccrual
								? data?.protocolTargetAccrual
								: data?.rcUpperAccrualGoal
								? data?.rcUpperAccrualGoal
								: data?.rcLowerAccrualGoal}{' '}
							study participants
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
	);
};

export default ClinicalTrialDetails;
