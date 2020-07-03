import React from "react";
import PropTypes from 'prop-types';

export const withLoader = (Component) => ({ loading, ...props }) => {
  console.log(loading, props);
  return loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle" />
      </div>
    </div>
  ) : (<Component {...props} />)
};

  withLoader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

export default withLoader;
