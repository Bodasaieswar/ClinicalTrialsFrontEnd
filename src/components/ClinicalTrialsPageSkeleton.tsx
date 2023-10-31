import { Skeleton, ListItem, List, Divider } from '@chakra-ui/react';
import React from 'react';

const ClinicalTrialsPageSkeleton = () => {
	return (
		<>
			<List>
				{Array.from({ length: 10 }).map((_, index) => (
					<React.Fragment key={index}>
						<ListItem key={index}>
							<Skeleton height="40px"></Skeleton>
							<Divider m={0} />

							<Skeleton height="100px"></Skeleton>
							<hr />
						</ListItem>
					</React.Fragment>
				))}
			</List>
		</>
	);
};

export default ClinicalTrialsPageSkeleton;
