import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWizard } from 'react-use-wizard';
// utils
import utilsSS from '../../../utils/utilsSS';
// context
import UserContext from '../../../contexts/Users.context';

export default function Step3() {
    const context = useContext(UserContext);
    const { previousStep, nextStep } = useWizard();

    const emailSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .min(5, 'Too Short!')
            .max(50, "Are you really sure that your email is that big?")
            .required('Required'),
    });
    
    let iValue;
    if (utilsSS.getItem('newUser').email) {
        iValue = {
            email: utilsSS.getItem('newUser').email
        }
    } else if (context.editUser !== "") {
        iValue = {
            email: context.editUser.email
        }
    } else {
        iValue = {
            email: ''
        }
    };

    const formik = useFormik({
        initialValues: iValue,
        validationSchema: emailSchema,
        onSubmit: values => {
            const { email } = values;

            if (!utilsSS.getItem('newUser').email) {
                let newUser = utilsSS.getItem('newUser');
                utilsSS.setItem('newUser', {...newUser, email});
                nextStep();
            } else if (utilsSS.getItem('newUser').email) {
                let newUser = utilsSS.getItem('newUser');
                utilsSS.setItem('newUser', {...newUser, email});
                nextStep();
            }else {
                previousStep();
            };
        }
    });

    const handleChange = (value) => {
        formik.setFieldValue('email', value);
    };

    return (
        <>
            <form id='step3_form'>
                <label htmlFor='email'>
                    Email
                </label>
                <input
                    id='email'
                    name='email'
                    type='text'
                    value={formik.values.email}
                    onChange={(e)=>{handleChange(e.target.value)}}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.touched.email &&
                    formik.errors.email
                }
            </form>
            <button
                onClick={() => previousStep()}>
                Previous ⏮️
            </button>
            <button
                form="step3_form"
                type="submit"
                onClick={formik.handleSubmit}
            >
                Next
            </button>
        </>
    );
};