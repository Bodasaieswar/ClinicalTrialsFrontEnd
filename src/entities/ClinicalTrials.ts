interface Trial {
	protocolId: string;
	nctNo: string;
	title: string | null;
	OfficialTitle: string | null;
	BriefSummary: string | null;
	age: string | null;
	MinimumAge: number | null;
	MaximumAge: number | null;
	protocolStatus: string | null;
}

export default interface ClinicalTrials extends Trial {
	result: Trial[];
}
