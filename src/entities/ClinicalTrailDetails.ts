export default interface ClinicalTrialDetails {
	NCTId: string;
	BriefTitle: string;
	OfficialTitle: string;
	MinimumAge: string;
	MaximumAge: string;
	StartDate: string;
	CompletionDate: string;
	BriefSummary: string;
	EligibilityCriteria: string;
	LeadSponsorName: string;
	Phase: string;
	StudyType: string;
	EnrollmentCount: number;
	LastUpdateSubmitDate: string;
	OverallOfficialName: string;
	OverallOfficialAffiliation: string;
	OverallOfficialRole: string;
	LocationFacility: string;
	LocationStatus: string;
	LocationCity: string;
	LocationState: string;
	LocationZip: string;
	LocationCountry: string;
	OfficialFacility: string; // Assuming it's string but you may need to parse it since it's formatted like an array in the example
	OfficialPI: string;
	OfficialContactRole: string;
	OfficialContactPhone: string;
	OfficialContactEmail: string;
	OfficialStatus: string;
	Conditions: string;
}
