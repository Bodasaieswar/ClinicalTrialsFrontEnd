const FormateAgeSentence = (
	MinimumAge: string | null | undefined,
	MaximumAge: string | null | undefined,
) => {
	if (MinimumAge && MaximumAge) {
		return `For people ages ${MinimumAge.toLowerCase()} to ${MaximumAge.toLowerCase()}`;
	} else if (MinimumAge) {
		return `For people ages ${MinimumAge.toLowerCase()} and up`;
	} else if (MaximumAge) {
		return `For people up to ${MaximumAge.toLowerCase()}`;
	} else {
		return `No age Limit`;
	}
};

export default FormateAgeSentence;
