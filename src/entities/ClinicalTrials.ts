interface Trial {
	NCTId: string;
	OfficialTitle: string | null;
	BriefSummary: string;
	MinimumAge: string | null;
	MaximumAge: string | null;
}

export default interface ClinicalTrails {
	NCTId: string;
	OfficialTitle: string | null | undefined;
	BriefSummary: string | null | undefined;
	MinimumAge: string | null;
	MaximumAge: string | null;
	result: Trial[];
}
