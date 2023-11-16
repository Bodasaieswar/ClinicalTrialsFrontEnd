import { Box, Flex, Spacer, Text, Image, Heading } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Error404 = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="bg-red p-3 mb-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<span
								className="text-uppercase heading-style m-0 text-white"
								onClick={() => {
									navigate('/');
								}}
								style={{ cursor: 'pointer' }} // Add this style
							>
								THE UNIVERSITY OF ARIZONA HEALTH SCIENCES
							</span>
						</div>
					</div>
				</div>
			</div>
			<main role="main">
				<div className="container">
					<div className="col-sm">
						<img
							src="/logo.png"
							alt="Arizona Clinical Trails Logo"
							className="col-6"
							onClick={() => {
								navigate('/');
							}}
							style={{ cursor: 'pointer' }}
						/>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<div id="main">
								<>
									<Flex>
										<Box
											p="4"
											pt="10"
										>
											<Heading color={'black'}>
												Page Not Found
											</Heading>
											<Text>
												Sorry, the page you requested
												could not be found.
											</Text>
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
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Error404;
