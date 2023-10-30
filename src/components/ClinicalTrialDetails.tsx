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

	const extractCriteria = (type) => {
		const splitData = data.EligibilityCriteria.split('Exclusion Criteria:');
		const criteria = type === 'Inclusion' ? splitData[0] : splitData[1];
		const criteriaList = criteria
			.split('\n\n')
			.filter((item) => item.trim() !== '');

		if (type === 'Inclusion') {
			criteriaList.shift(); // Removing the "Inclusion Criteria:" header
		}

		return criteriaList;
	};

	const inclusionCriteria = extractCriteria('Inclusion');
	const exclusionCriteria = extractCriteria('Exclusion');

	const formatDate = (dateString: string) => {
		const options = { month: 'long', year: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

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
						{FormateAgeSentence(data?.MinimumAge, data?.MaximumAge)}
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
								{formatDate(data?.PrimaryCompletionDate)}
							</span>
						</Text>
					</HStack>
				</Box>
				<Box>
					<HStack>
						<Icon as={FaUserDoctor} />
						<Text m={0}>
							study started {data?.OverallOfficialName}
						</Text>
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
				<Heading as={'h5'}>Description</Heading>

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
				<Heading as={'h5'}>
					Lead Scientist at University of Arizona Health Sciences
				</Heading>
				<Heading as={'h5'}>Details</Heading>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
						align={'right'}
					>
						Status
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						Start Date
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						Completion Date
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						Sponsor
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						Link
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						ID
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						Phase
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						Study Type
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						Participants
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
				<HStack>
					<Text
						pl={'60px'}
						fontWeight={600}
						m={0}
					>
						Last Updated
					</Text>
					<Text
						pl={'60px'}
						m={0}
					>
						{data?.OverallStatus}
					</Text>
				</HStack>
			</VStack>
		</>
	);
};

export default ClinicalTrialDetails;
