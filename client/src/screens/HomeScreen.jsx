import React, { useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message  from "../components/Message";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({
  listProducts,
  productList: { products, loading, error },
}) => {
  console.log("my products are", products);
  useEffect(() => {
    listProducts();
  }, [listProducts]);

  console.log("my products", products);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <loader/>
      ) : error ? (
        <Message variant='danger'/>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={6}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  productList: state.productList,
});

export default connect(mapStateToProps, { listProducts })(HomeScreen);
