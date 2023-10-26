interface Trial {
	NCTId: string;
	OfficialTitle: string | null;
	BriefSummary: string;
}

export default interface ClinicalTrails {
	NCTId: string;
	OfficialTitle: string | null | undefined;
	BriefSummary: string | null | undefined;
	result: Trial[];
}
