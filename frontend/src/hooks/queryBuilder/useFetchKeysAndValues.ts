import getKeysAutoComplete from 'api/queryBuilder/getKeysAutoComplete';
import getValuesAutoComplete from 'api/queryBuilder/getValuesAutoComplete';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { separateSearchValue } from 'utils/separateSearchValue';

import { OPERATORS } from '../../constants/queryBuilder';
import { PayloadProps } from '../../types/api/queryBuilder/getKeysAutoComplete';
import { getCountOfSpace } from '../../utils/getCountOfSpace';
import { KeyType } from './useAutoComplete';

type UseFetchKeysAndValuesReturnT = {
	keys: KeyType[];
	results: string[];
};

export const useFetchKeysAndValues = (
	searchValue: string,
): UseFetchKeysAndValuesReturnT => {
	const [keys, setKeys] = useState<KeyType[]>([]);
	const [results, setResults] = useState([]);

	useEffect(() => {
		getKeysAutoComplete().then(({ payload }) => {
			if (payload) {
				setKeys(payload);
			}
		});
	}, []);

	const handleSetKey = (payload: PayloadProps[] | null): void => {
		if (payload) {
			setKeys(payload);
		} else {
			setKeys([]);
		}
	};

	const getIsMulti = (operator: string): boolean =>
		operator === OPERATORS.IN || operator === OPERATORS.NIN;
	const getResultPayload = (isMulti: boolean, tResult: string[]): string =>
		isMulti ? '' : tResult.join(' ');

	const handleFetchOption = async (value: string): Promise<void> => {
		if (value) {
			const [tKey, operator, tResult] = separateSearchValue(value);
			const isMulti = getIsMulti(operator);
			const resultPayload = getResultPayload(isMulti, tResult);

			if (getCountOfSpace(value) === 0 && tKey) {
				const { payload } = await getKeysAutoComplete(value);
				handleSetKey(payload);
			}

			if (tKey && operator) {
				const { payload } = await getValuesAutoComplete(tKey, resultPayload);
				if (payload) {
					const values = Object.values(payload).find((el) => !!el);
					if (values) {
						setResults(values);
					} else {
						setResults([]);
					}
				}
			}
		}
	};

	const clearFetcher = useRef(handleFetchOption).current;

	useDebounce(() => clearFetcher(searchValue), 200, [clearFetcher, searchValue]);

	return {
		keys,
		results,
	};
};
