interface Trial {
	protocolId: string;
	nctNo: string;
	OfficialTitle: string | null;
	BriefSummary: string;
	MinimumAge: string | null;
	MaximumAge: string | null;
	protocolStatus: string | null;
}

export default interface ClinicalTrials {
	protocolId: string;
	nctNo: string;
	OfficialTitle: string | null | undefined;
	BriefSummary: string | null | undefined;
	MinimumAge: string | null;
	MaximumAge: string | null;
	protocolStatus: string | null;
	result: Trial[];
}
