import { Box, Flex, Spacer, Image, Heading } from '@chakra-ui/react';

const SomethingWentWrong = () => {
	return (
		<>
			<Flex>
				<Box
					p="4"
					pt="10"
				>
					<Heading>Oops!</Heading>
					<Heading>Something Went Wrong</Heading>
				</Box>
				<Spacer />
				<Box p="4">
					<Image
						src="/wilbur_wilma.png"
						alt="A Picture of wilbur and wilma"
					/>
				</Box>
			</Flex>
		</>
	);
};

export default SomethingWentWrong;
