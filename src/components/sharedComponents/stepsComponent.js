import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const stepsList=[
    {stepIndex: 1, cssClass: 'inactive', page: 'user'}, 
    {stepIndex: 2, cssClass: 'inactive', page: 'privacy'}, 
    {stepIndex: 3, cssClass: 'inactive', page: 'done'}
];

export const StepsComponent = ({currentStep="user"}) => {
    console.log(currentStep);
    const [currentLoc, setCurrentLoc] = useState(currentStep);
   

    const setPrevStep = () => {
        const currentIdx = stepsList.find(s => s.page === currentStep ? s.stepIndex : 0);
        const stepsElements = [...document.querySelectorAll('.steps li')];
        let curr = 1;

        stepsElements.forEach(el => {
            if (currentIdx.stepIndex - curr) {
                el.classList.add('completed');
            } 
           
        });
    };

    useEffect(() => {
        if (currentStep) {
            setCurrentLoc(currentStep);
            setPrevStep();
        }
    }, [currentStep, setPrevStep]);

    return (
        <div className="steps-container">
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
