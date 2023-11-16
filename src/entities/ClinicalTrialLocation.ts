interface TrialLocations {
	id: number;
	nctNo: string | null;
	LocationFacility?: string | null;
	LocationStatus?: string | null;
	LocationCity?: string | null;
	LocationState?: string | null;
	LocationZip?: string | null;
	LocationCountry?: string | null;
	dbcreateddata: Date | null;
}

export default interface ClinicalTrialLocation extends TrialLocations {
	result: TrialLocations[];
}
