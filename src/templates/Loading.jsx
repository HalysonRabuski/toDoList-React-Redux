import React from 'react';
import { connect } from 'react-redux';
import { css } from "@emotion/core";

import RingLoader from "react-spinners/RingLoader";

const override = css`
  position: fixed;  
  z-index: 1 !important;  
  left: 50%;
  top: 20%;
  margin: 0 auto;
`;

var isOpen;
const Loading = ({ status }) => (
    isOpen = status === 'start' ? true : false,
    <div className="sweet-loading">
        <RingLoader
        css={override}
        height={50}
        width={5}
        size={100}  
        color={"#25c2b0"}
        loading={isOpen}
        />
    </div>
);

const mapStateToProps = ({ fetch }) => ({
    status: fetch.status
});

export default connect(mapStateToProps, null)(Loading);