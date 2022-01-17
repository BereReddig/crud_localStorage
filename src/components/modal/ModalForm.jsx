import React from 'react';
import { Wizard } from 'react-use-wizard';
// components
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

export default function ModalForm({ onClose }) {
    return (
        <Wizard>
            <Step1 />
            <Step2 />
            <Step3 />
            <Step4
                onClose={onClose}
            />
        </Wizard>
    );
};
