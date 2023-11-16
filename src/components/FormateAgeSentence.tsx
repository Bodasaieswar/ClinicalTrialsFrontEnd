const FormatAgeSentence = (
	age: string | null | undefined,
	MinimumAge: number | null | undefined,
	MaximumAge: number | null | undefined,
) => {
	// Handle specific age ranges
	// Safely converting age to lowercase
	const ageCategory = typeof age === 'string' ? age.toLowerCase() : null;
	if (
		MinimumAge !== null &&
		MinimumAge !== undefined &&
		MaximumAge !== null &&
		MaximumAge !== undefined
	) {
		return `For people ages ${MinimumAge} years to ${MaximumAge} years`;
	} else if (MinimumAge !== null && MinimumAge !== undefined) {
		return `For people ages ${MinimumAge} years and up`;
	} else if (MaximumAge !== null && MaximumAge !== undefined) {
		return `For people up to ${MaximumAge} years`;
	}

	// Check for specific age categories first
	if (ageCategory?.toLowerCase() === 'children') {
		return 'For ages 1 year to 12 years';
	} else if (ageCategory?.toLowerCase() === 'adults') {
		return 'For ages 12 years and up';
	} else if (ageCategory?.toLowerCase() === 'both') {
		return 'No age limit';
	}

	return 'No age limit';
};

export default FormatAgeSentence;
