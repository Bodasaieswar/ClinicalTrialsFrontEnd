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
		return `For people ages ${MinimumAge.toLowerCase()} to ${MaximumAge.toLowerCase()}`;
	} else if (MinimumAge && MinimumAge.toLowerCase() !== 'not available') {
		return `For people ages ${MinimumAge.toLowerCase()} and up`;
	} else if (MaximumAge && MaximumAge.toLowerCase() !== 'not available') {
		return `For people up to ${MaximumAge.toLowerCase()}`;
	} else if (
		MinimumAge &&
		MinimumAge.toLowerCase() === 'not available' &&
		MaximumAge &&
		MaximumAge.toLowerCase() === 'not available'
	) {
		return `Age information is not available`;
	} else {
		return `No age Limit`;
	}
};

export default FormateAgeSentence;
