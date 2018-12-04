import {
  reduce,
  filter,
  has,
  assign,
  isEmpty,
  map,
  keys,
  concat,
  flow,
  omit,
  camelCase,
} from 'lodash-es';

export const removeFalsy = (obj) => {
  const newObj = {};
  keys(obj).forEach((prop) => {
    if (!isEmpty(obj[prop])) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

const reducer = predicate => (acc, req) => {
  const filteredResponses = filter(req.jsonPath, predicate);

  if (!isEmpty(filteredResponses)) {
    const mappedResponse = map(filteredResponses, (obj) => {
      return assign({}, { ...omit(obj, 'path') }, { paths: map(obj.path, p => p.join('.')) });
    });

    return assign({ results: concat(acc.results, assign({ url: req.request }, ...mappedResponse)) });
  }

  return acc;
};

function transformAnalyzerResult(jsonObject) {
  return reduce(keys(jsonObject), (acc, key) => {
    const xhr = reduce(
      jsonObject[key],
      reducer(obj => !(has(obj, 'enclosingVariable') || has(obj, 'enclosingScript'))),
      { results: [] }
    );

    const script = reduce(
      jsonObject[key],
      reducer(obj => has(obj, 'enclosingScript')),
      { results: [] }
    );

    const html = reduce(
      jsonObject[key],
      reducer(obj => has(obj, 'enclosingVariable')),
      { results: [] }
    );

    return assign({}, acc, { [camelCase(key)]: { xhr, script, html } });
  }, {});
}

export const transformMetadata = flow([transformAnalyzerResult]);
