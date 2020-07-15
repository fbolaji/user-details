import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';

export const StepsComponent = ({ stepsList, currentStep="user"}) => {
   const { createUserDetails, loadingData } =  useSelector(state => state?.user);
    const [currentLoc] = useState(currentStep);
    const [stepState] = useState(stepsList);

    const renderSteps = () => {
        const list =  stepState.map(step => currentLoc === step.page
            ? (<li
                    key={step.stepIndex}
                    className={!_isEmpty(createUserDetails) && !loadingData ? "inactive" : "is-active"}>
                    {step.page}
                </li>)
            : (<li
                    key={step.stepIndex}
                    className={step.cssClass}>
                    {step.page}
                </li>)
        );

        return list;
    };

    return (
        <div data-testid="test-steps" className="steps-container">
            <ul className="steps">
                {renderSteps()}
            </ul>
        </div>
    )
};

StepsComponent.prototype = {
    currentStep: PropTypes.string.isRequired,
};

export default StepsComponent;
