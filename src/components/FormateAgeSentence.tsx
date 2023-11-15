const FormateAgeSentence = (
	MinimumAge: string | null | undefined,
	MaximumAge: string | null | undefined,
) => {
	if (
		MinimumAge &&
		MinimumAge.toLowerCase() !== 'not available' &&
		MaximumAge &&
		MaximumAge.toLowerCase() !== 'not available'
	) {
		return `For people ages ${MinimumAge.toLowerCase()} years to ${MaximumAge.toLowerCase()} years`;
	} else if (MinimumAge && MinimumAge.toLowerCase() !== 'not available') {
		return `For people ages ${MinimumAge.toLowerCase()} years and up`;
	} else if (MaximumAge && MaximumAge.toLowerCase() !== 'not available') {
		return `For people up to ${MaximumAge.toLowerCase()} years`;
	} else if (
		MinimumAge &&
		MinimumAge.toLowerCase() === 'not available' &&
		MaximumAge &&
		MaximumAge.toLowerCase() === 'not available'
	) {
		return `No age Limit`;
	} else {
		return `No age Limit`;
	}
};

export default FormateAgeSentence;
