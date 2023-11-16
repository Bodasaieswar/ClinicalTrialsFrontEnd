interface Trial {
	protocolId: string;
	nctNo: string;
	OfficialTitle: string | null;
	BriefSummary: string | null; // Assuming BriefSummary can also be null
	MinimumAge: string | null;
	MaximumAge: string | null;
	protocolStatus: string | null;
}

export default interface ClinicalTrials extends Trial {
	result: Trial[];
}
