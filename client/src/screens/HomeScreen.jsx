import React, { useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import {connect} from "react-redux"
import Product from "../components/Product";
import {listProducts} from "../actions/productActions";

const HomeScreen = ({ listProducts, productList: { products } }) => {

  console.log("my products are", products)
  useEffect(() => {
    listProducts();
  }, []);

  console.log("my products", products);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={6}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  productList: state.productList
});

export default connect(mapStateToProps,{listProducts})(HomeScreen);
