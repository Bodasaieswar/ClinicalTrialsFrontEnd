import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<div className="bg-red p-3 mb-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<span className="text-uppercase heading-style m-0 text-white">
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
							src="src/assets/logo.png"
							alt="Displaying PNG"
							className="col-6"
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
							<small className="text-black text-left">
								UAHS Research Administration
							</small>
							<br />
							<small>
								1670 E. Drachman Street, Tucson, AZ 85721
							</small>
							<br />
							<a
								href="mailto:VPHS-CRO@email.arizona.edu"
								className="btn btn-link"
							>
								VPHS-CRO@email.arizona.edu
							</a>
							<br />
							<br />
							<small className="text-black">
								College of Medicine - Tucson
							</small>
							<br />
							<small>
								1501 N. Campbell Ave., Tucson, AZ 85724
							</small>
							<br />
							<br />
							<small className="text-black">
								College of Medicine - Phoenix
							</small>
							<br />
							<small>
								550 E. Van Buren Street, Phoenix, AZ 85004
							</small>
							<br />
							<br />
							<hr />
							<br />
						</div>
						<div className="col-12">
							The University of Arizona is an EEO/AA - M/W/D/V
							Employer.
							<br />
							<a
								href="#"
								className="btn btn-link"
							>
								Admin Login
							</a>
							<small>Web development by UAHS Biocom</small>
						</div>
						<small className="text-black text-center">
							© 2021 The Arizona Board of Regents on behalf of The
							University of Arizona.
						</small>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Layout;
