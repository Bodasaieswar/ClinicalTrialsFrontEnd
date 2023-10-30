import { Stack, Skeleton, ListItem, List } from '@chakra-ui/react';
import React from 'react';

const ClinicalTrialsPageSkeleton = () => {
	return (
		<>
			<List>
				{Array.from({ length: 10 }).map((_, index) => (
					<React.Fragment key={index}>
						<ListItem key={index}>
							<Skeleton height="20px"></Skeleton>

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
