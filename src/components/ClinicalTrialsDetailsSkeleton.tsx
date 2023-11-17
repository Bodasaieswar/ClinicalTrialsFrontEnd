import {
	VStack,
	Text,
	Heading,
	Divider,
	Box,
	Container,
	ListItem,
	UnorderedList,
	Skeleton,
	SkeletonText,
	List,
} from '@chakra-ui/react';

import React from 'react';

const ClinicalTrialsDetailsSkeleton = () => {
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
					<Skeleton height="40px" />
				</Heading>
				<Divider />
				<SkeletonText
					mt="4"
					mb="4"
					noOfLines={4}
					spacing="4"
					skeletonHeight="2"
				/>

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
					<Box
						pl={'50px'}
						mb={1}
					>
						<SkeletonText
							noOfLines={5}
							spacing="4"
							skeletonHeight="2"
						/>
					</Box>
				</Box>
				<Box>
					<Text
						pl={'30px'}
						fontSize={'lg'}
						as={'b'}
					>
						Official Title
					</Text>
					<Box
						pl={'50px'}
						mb={1}
					>
						<SkeletonText
							noOfLines={5}
							spacing="4"
							skeletonHeight="2"
						/>
					</Box>
				</Box>
				<Box>
					<Text
						pl={'30px'}
						fontSize={'lg'}
						as={'b'}
					>
						Keywords
					</Text>
					<Box
						pl={'50px'}
						mb={1}
					>
						<SkeletonText
							noOfLines={5}
							spacing="4"
							skeletonHeight="2"
						/>
					</Box>
				</Box>

				<Divider m={0} />
				<Heading
					as={'h5'}
					mt={0}
					mb={1}
				>
					Eligibility
				</Heading>
				<Text pl={'30px'}>
					<SkeletonText
						noOfLines={5}
						spacing="4"
						skeletonHeight="2"
					/>
				</Text>
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
					<List>
						{Array.from({ length: 2 }).map((_, index) => (
							<React.Fragment key={index}>
								<ListItem key={index}>
									<Skeleton height="10px"></Skeleton>
									<Divider m={0} />

									<Skeleton height="10px"></Skeleton>
									<hr />
								</ListItem>
							</React.Fragment>
						))}
					</List>
				</UnorderedList>

				<Divider m={0} />
				<Heading
					as={'h5'}
					mt={0}
					mb={1}
				>
					Lead Scientist at{' '}
					<Skeleton
						mt={'5px'}
						height="20px"
					/>
				</Heading>
				<Text>
					<Skeleton height="20px" />
				</Text>
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
								<Skeleton height="20px" />
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
								<Skeleton height="20px" />
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
								<Skeleton height="20px" />
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
								<Skeleton height="20px" />
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
								<Skeleton height="20px" />
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
								<Skeleton height="20px" />
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
								<Skeleton height="20px" />
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
								<Skeleton height="20px" />
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
								<Skeleton height="20px" />
							</Text>
						</Box>
					</Box>
				</Container>
			</VStack>
		</>
	);
};

export default ClinicalTrialsDetailsSkeleton;
