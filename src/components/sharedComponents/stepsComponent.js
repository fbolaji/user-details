import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StepsComponent = ({ stepsList, currentStep="user"}) => {
    const [currentLoc, setCurrentLoc] = useState(currentStep);

    const setPrevStep = () => {
        const currentIdx = stepsList.find(s => s.page === currentStep);
        const stepsElements = [...document.querySelectorAll('.steps li')];
        const filterList = stepsElements.filter((item, index) => index < currentIdx.stepIndex ? item : '');

        filterList.forEach((el, index) => {
            el.classList.add('completed');
        });
    };

    useEffect(() => {
        setCurrentLoc(currentStep);
    }, [currentStep]);

    useEffect(() => {
        setPrevStep();
    })

    return (
        <div data-testid="test-steps" className="steps-container">
            <ul className="steps">
                {stepsList.map((step, index) => 
                <li 
                    key={step.stepIndex} 
                    className={currentLoc === step.page ? 'is-active' : step.cssClass }>
                    {step.page}
                    </li>)
                }
            </ul>
        </div>
    )
};

StepsComponent.prototype = {
    currentStep: PropTypes.string.isRequired,
};

export default StepsComponent;
