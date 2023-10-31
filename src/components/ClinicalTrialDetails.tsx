import { useNavigate, useParams } from 'react-router-dom';
import useClinicalTrialDetails from '../hooks/useClinicalTrialDetails';
import ClinicalTrialsPageSkeleton from './ClinicalTrialsPageSkeleton';
import {
	VStack,
	Text,
	Heading,
	Divider,
	Box,
	HStack,
	Icon,
	Badge,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
	Flex,
	Center,
	Spacer,
	Container,
	Link,
	ListItem,
	UnorderedList,
} from '@chakra-ui/react';
import FormateAgeSentence from './FormateAgeSentence';
import { BsFillPeopleFill, BsCalendar2CheckFill } from 'react-icons/bs';
import { FaLocationDot, FaUserDoctor } from 'react-icons/fa6';
import { GrStatusGood } from 'react-icons/gr';

const ClinicalTrialDetails = () => {
	const navigate = useNavigate();
	const { NCTId } = useParams();
	const { data, isLoading, error } = useClinicalTrialDetails(NCTId);

	if (error) return <p>Error: {error.message}</p>;
	if (isLoading) return <ClinicalTrialsPageSkeleton />;

	// const extractCriteria = (type) => {
	// 	const splitData = data.EligibilityCriteria.split('Exclusion Criteria:');
	// 	const criteria = type === 'Inclusion' ? splitData[0] : splitData[1];
	// 	const criteriaList = criteria
	// 		.split('\n\n')
	// 		.filter((item) => item.trim() !== '');

	// 	if (type === 'Inclusion') {
	// 		criteriaList.shift(); // Removing the "Inclusion Criteria:" header
	// 	}

	// 	return criteriaList;
	// };

	// const inclusionCriteria = extractCriteria('Inclusion');
	// const exclusionCriteria = extractCriteria('Exclusion');

	const formatDate = (dateString: string) => {
		const options = { month: 'long', year: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const facilities = data?.LocationFacility.split(',');
	const statuses = data?.LocationStatus.split(',');
	const cities = data?.LocationCity.split(',');
	const states = data?.LocationState.split(',');

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
						<Icon as={BsFillPeopleFill} />
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
						<Icon as={FaLocationDot} />
						<Text m={0}>at The Univeristy of Arizona</Text>
					</HStack>
				</Box>
				<Box>
					<HStack>
						<Icon as={BsCalendar2CheckFill} />
						<Text m={0}>
							study started {formatDate(data?.StartDate)}{' '}
							<span>
								estimated completion{' '}
								{formatDate(data?.CompletionDate)}
							</span>
						</Text>
					</HStack>
				</Box>
				<Box>
					<HStack>
						<Icon as={FaUserDoctor} />
						<Text m={0}>by {data?.OverallOfficialName}</Text>
					</HStack>
				</Box>
				<Box>
					<HStack>
						<Icon
							as={GrStatusGood}
							color="green.100"
						/>
						<Badge colorScheme="green">
							<Text m={0}>{data?.OverallStatus}</Text>
						</Badge>
					</HStack>
				</Box>
				<Divider />
				<Heading
					as={'h5'}
					mt={0}
				>
					Description
				</Heading>

				<Box>
					<Text
						pl={'30px'}
						fontSize={'lg'}
					>
						Summary
					</Text>
					<Text pl={'50px'}>{data?.BriefSummary}</Text>
				</Box>
				<Box>
					<Text
						pl={'30px'}
						fontSize={'lg'}
					>
						Official Title
					</Text>
					<Text pl={'50px'}>{data?.OfficialTitle}</Text>
				</Box>
				<Divider />
				<Heading as={'h5'}>Eligibility</Heading>
				<Heading as={'h5'}>Locations</Heading>
				<UnorderedList pl={'30px'}>
					{facilities?.map((facility, index) => (
						<ListItem key={facility}>
							<Box>
								<Text>
									{facility}
									<Badge>{statuses[index]}</Badge>
								</Text>
								<Text>
									{cities[index]}, {states[index] || 'N/A'},{' '}
									{data.LocationZip}, {data.LocationCountry}
								</Text>
							</Box>
						</ListItem>
					))}
				</UnorderedList>

				<Divider />
				<Heading as={'h5'}>
					Lead Scientist at University of Arizona Health Sciences
				</Heading>
				<Heading as={'h5'}>Details</Heading>
				<Container ml={25}>
					<dl className="row">
						<dt className="col-sm-3 text-sm-right">Status</dt>
						<dd className="col-sm-9"> accepting new patients</dd>

						<dt className="col-sm-3 text-sm-right">Start Date</dt>
						<dd className="col-sm-9">
							{formatDate(data?.StartDate)}
						</dd>
						<dt className="col-sm-3 text-sm-right">
							Completion Date
						</dt>
						<dd className="col-sm-9">
							{formatDate(data?.CompletionDate)}
						</dd>
						<dt className="col-sm-3 text-sm-right">Sponsor</dt>
						<dd className="col-sm-9">{data?.LeadSponsorName}</dd>
						<dt className="col-sm-3 text-sm-right">ID</dt>
						<dd className="col-sm-9">
							<Link
								href={`https://clinicaltrials.gov/study/${data?.NCTId}`}
								isExternal
							>
								{data?.NCTId}
							</Link>
						</dd>
						<dt className="col-sm-3 text-sm-right">Phase</dt>
						<dd className="col-sm-9">{data?.Phase}</dd>
						<dt className="col-sm-3 text-sm-right">Study Type</dt>
						<dd className="col-sm-9">{data?.StudyType}</dd>
						<dt className="col-sm-3 text-sm-right">Participants</dt>
						<dd className="col-sm-9">
							Expecting {data?.EnrollmentCount} study participants
						</dd>
						<dt className="col-sm-3 text-sm-right">Last Updated</dt>
						<dd className="col-sm-9">
							{formatDate(data?.LastUpdateSubmitDate)}
						</dd>
					</dl>
				</Container>
			</VStack>
		</>
	);
};

export default ClinicalTrialDetails;
