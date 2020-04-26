import $axios from '../config/axiosInstance';
import * as url from '../enums/url';
import {
  GET_DATA,
  GET_DETAIL,
  GET_TYPES,
} from '../enums/mutations';

export const getData = (nextUrl) => {
  return async dispatch => {
    const { next, results } = (await $axios.get(nextUrl || url.getData)).data;
    dispatch({
      type: GET_DATA,
      payload: { next, results }
    })
  }
}

export const getDataByType = (name) => {
  return async dispatch => {
    console.log(name)
    const { pokemon } = (await $axios.get(`${url.getType}${name}`)).data;
    const results = pokemon.map(x => x.pokemon)
    dispatch({
      type: GET_DATA,
      payload: { next: null, results }
    })
  }
}

export const getTypes = () => {
  return async dispatch => {
    const { results } = (await $axios.get(url.getType)).data;
    const types = results.map(x => x.name)
    dispatch({
      type: GET_TYPES,
      payload: types
    })
  }
}

export const getDetail = (id) => {
  return async dispatch => {
    const { data } = (await $axios.get(`${url.getData}${id}/`));
    dispatch({
      type: GET_DETAIL,
      payload: data
    })
  }
}