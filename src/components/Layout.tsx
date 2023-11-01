import { Box, Divider, Flex, Icon, Link, Spacer, Text } from '@chakra-ui/react';

import { Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
const Layout = () => {
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
							src="logo.png"
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
								<Outlet />
							</div>
						</div>
					</div>
				</div>
			</main>

			<footer className="footer bg-warm-gray text-center">
				<div className="container py-4">
					<div className="row">
						<div className="col-12">
							<Flex>
								<Box
									p="4"
									textAlign="left"
								>
									<Link
										href="https://research.uahs.arizona.edu/"
										color="blue.700"
										textDecoration={'underline'}
										fontSize={'xs'}
										isExternal
									>
										UAHS Research Administration
									</Link>

									<Text
										fontSize="xs"
										m={0}
									>
										1670 E. Drachman Street
									</Text>
									<Text
										fontSize={'xs'}
										m={0}
									>
										Tucson, AZ 85721
									</Text>
									<Link
										href="mailto:VPHS-CRO@email.arizona.edu"
										color="blue.600"
										fontSize={'xs'}
										isExternal
										pr={'2px'}
									>
										VPHS-CRO@email.arizona.edu
										<span>
											<Icon as={AiOutlineMail} />
										</span>
									</Link>
									<Spacer mb={'10px'} />
									<Link
										href="https://medicine.arizona.edu/"
										fontSize="xs"
										color="blue.700"
										isExternal
										textDecoration={'underline'}
									>
										College of Medicine - Tucson
									</Link>

									<Text
										fontSize="xs"
										m={0}
									>
										1501 N. Campbell Ave
									</Text>
									<Text
										fontSize={'xs'}
										m={0}
									>
										Tucson, AZ 85721
									</Text>
									<Spacer mb={'10px'} />
									<Link
										href="https://medicine.arizona.edu/"
										fontSize="xs"
										color="blue.700"
										isExternal
										textDecoration={'underline'}
									>
										College of Medicine - Phoenix
									</Link>

									<Text
										fontSize="xs"
										m={0}
									>
										550 E. van Buren Street
									</Text>
									<Text
										fontSize={'xs'}
										m={0}
									>
										Phoenix, AZ 85004
									</Text>
								</Box>
								<Spacer />
								<Box
									p="4"
									textAlign={'right'}
								>
									<Link
										href="https://healthsciences.arizona.edu/"
										fontSize="lg"
										color="blue.700"
										isExternal
									>
										The University of Arizona Health
										Sciences
									</Link>
									<Text fontSize={'xs'}>
										The University of Arizona is an EEO/AA -
										M/W/D/V Employer.
									</Text>
								</Box>
							</Flex>
						</div>
						<Divider />
						<Box
							w={'100%'}
							textAlign={'center'}
						>
							<Text fontSize={'sm'}>
								© 2021 The Arizona Board of Regents on behalf of
								The University of Arizona.
							</Text>
						</Box>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Layout;
