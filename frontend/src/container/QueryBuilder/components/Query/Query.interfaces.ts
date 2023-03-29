import { IBuilderQuery } from 'types/api/queryBuilder/queryBuilderData';

import { QueryLabelProps } from '../QueryLabel/QueryLabel.interfaces';

export type QueryProps = {
	index: number;
	isAvailableToDisable: boolean;
	query: IBuilderQuery;
	queryVariant: QueryLabelProps['variant'];
};
