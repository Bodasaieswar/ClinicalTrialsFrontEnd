import { Text } from '@chakra-ui/react';

const FormateAgeSentence = (
	MinimumAge: string | null | undefined,
	MaximumAge: string | null | undefined,
) => {
	if (MinimumAge && MaximumAge) {
		return (
			<Text
				fontSize={'xs'}
				mb={'3px'}
				backgroundColor={'whiteAlpha.300'}
			>
				For people ages {MinimumAge.toLowerCase()} to{' '}
				{MaximumAge.toLowerCase()}
			</Text>
		);
	} else if (MinimumAge) {
		return (
			<Text
				fontSize={'xs'}
				mb={'3px'}
				backgroundColor={'whiteAlpha.300'}
			>
				For people ages {MinimumAge.toLowerCase()} and up
			</Text>
		);
	} else if (MaximumAge) {
		return (
			<Text
				fontSize={'xs'}
				mb={'3px'}
				backgroundColor={'whiteAlpha.300'}
			>
				For people up to {MaximumAge.toLowerCase()}
			</Text>
		);
	} else {
		return (
			<Text
				fontSize={'xs'}
				mb={'3px'}
				backgroundColor={'whiteAlpha.300'}
			>
				No age Limit
			</Text>
		);
	}
};

export default FormateAgeSentence;
