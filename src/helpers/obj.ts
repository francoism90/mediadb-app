/**
 * By default Lodash does recursive merge/concat objects/arrays.
 * We want to replace the object instead.
 *
 * @doc https://lodash.com/docs/#mergeWith
 */
export const mergeDeep = (objValue: unknown, srcValue: unknown) => srcValue;
