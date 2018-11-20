import { reduce, filter, has, assign, isEmpty, map, keys, concat, flow, omit } from 'lodash-es';
import humps from 'humps';

export const removeFalsy = (obj) => {
  const newObj = {};
  keys(obj).forEach((prop) => {
    if (!isEmpty(obj[prop])) {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

function xhrReducer(acc, req) {
  const xhr = filter(req.jsonPath, obj => !(has(obj, 'enclosingVariable') || has(obj, 'enclosingScript')));

  if (!isEmpty(xhr)) {
    const paths = map(xhr, obj => map(obj.path, p => p.join('.')));

    return assign({ results: concat(acc.results, { url: req.request, paths }) });
  }

  return acc;
}

function scriptReducer(acc, req) {
  const script = filter(req.jsonPath, obj => has(obj, 'enclosingScript'));

  if (!isEmpty(script)) {
    const mappedScripts = map(script, (obj) => {
      return assign({}, { ...omit(obj, 'path') }, { paths: map(obj.path, p => p.join('.')) });
    });

    const data = map(mappedScripts, s => ({ url: req.request, ...s }));

    return assign({ results: concat(acc.results, data) });
  }

  return acc;
}

function transformAnalyzerResult(jsonObject) {
  return reduce(keys(jsonObject), (acc, key) => {
    const xhr = reduce(jsonObject[key], xhrReducer, { results: [] });
    const script = reduce(jsonObject[key], scriptReducer, { results: [] });
    // const html = ...

    return assign({}, acc, { [key]: { xhr, script } });
  }, {});
}

export const transformMetadata = flow([humps.camelizeKeys, transformAnalyzerResult]);
