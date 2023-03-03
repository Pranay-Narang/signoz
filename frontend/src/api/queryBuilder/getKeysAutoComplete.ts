import axios from 'api';
import { ErrorResponseHandler } from 'api/ErrorResponseHandler';
import { AxiosError } from 'axios';
import { ErrorResponse, SuccessResponse } from 'types/api';
import { PayloadProps } from 'types/api/queryBuilder/getKeysAutoComplete';

const getKeysAutoComplete = async (
	searchText?: string,
	aggregateOperator: undefined | string = 'sum',
	dataSource: undefined | string = 'metrics',
	aggregateAttribute: undefined | string = 'signoz_calls_total',
): Promise<SuccessResponse<PayloadProps[]> | ErrorResponse> => {
	try {
		const data = await axios({
			method: 'get',
			url: `/api/v3/autocomplete/attribute_keys?aggregateOperator=${aggregateOperator}&dataSource=${dataSource}&aggregateAttribute=${aggregateAttribute}&searchText=${
				searchText || ''
			}`,
			baseURL: process.env.QUERY_BUILDER_ENDPOINT,
		});

		return {
			statusCode: 200,
			error: null,
			message: '',
			payload: data.data.data.attributeKeys,
		};
	} catch (error) {
		return ErrorResponseHandler(error as AxiosError);
	}
};

export default getKeysAutoComplete;
