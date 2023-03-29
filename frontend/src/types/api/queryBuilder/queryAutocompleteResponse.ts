export interface AutocompleteData {
	dataType: 'number' | 'string' | 'boolean';
	isColumn: boolean;
	key: string;
	type: 'tag' | 'resource';
}

export interface IQueryAutocompleteResponse {
	attributeKeys: AutocompleteData[];
}
