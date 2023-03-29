import { IBuilderQuery } from 'types/api/queryBuilder/queryBuilderData';

export type AgregatorFilterProps = {
	onChange: (value: string) => void;
	query: IBuilderQuery;
};
