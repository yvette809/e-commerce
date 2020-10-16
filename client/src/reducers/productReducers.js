import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

const initialState = {
  products: [],
  product: { reviews: [] },
  loading: true,
  error:{}
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case PRODUCT_DETAILS_FAIL:
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};


export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}