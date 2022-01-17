import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWizard } from 'react-use-wizard';
// utils
import utilsSS from '../../../utils/utilsSS';
// context
import UserContext from '../../../contexts/Users.context';

export default function Step2() {
    const context = useContext(UserContext);
    //console.log('context ', context.editUser !== "")
    const { previousStep, nextStep } = useWizard();

    const nameSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'Too Short!')
            .max(50, "Are you really sure that your name is that big?")
            .required('Required'),
    });

    let iValue;
    if (utilsSS.getItem('newUser').name) {
        iValue = {
            name: utilsSS.getItem('newUser').name
        }
    } else if (context.editUser !== "") {
        iValue = {
            name: context.editUser.name
        }
    } else {
        iValue = {
            name: ''
        }
    };

    const formik = useFormik({
        initialValues: iValue,
        validationSchema: nameSchema,
        onSubmit: values => {
            const { name } = values;

            if (!utilsSS.getItem('newUser').nombre) {
                // si no esta seteado el nombre lo setea
                let userData = utilsSS.getItem('newUser');
                utilsSS.setItem('newUser', { ...userData, name });
                nextStep();
            } else if (utilsSS.getItem('newUser').nombre) {
                // si esta seteado el nombre lo sobreescribe
                let userData = utilsSS.getItem('newUser');
                utilsSS.setItem('newUser', { ...userData, name });
                nextStep();
            } else {
                previousStep();
            };
        }
    });

    const handleChange = (value) => {
        formik.setFieldValue('name', value);
    };

    return (
        <>
            <form id='step2_form'>
                <label htmlFor='name'>
                    Name
                </label>
                <input
                    id='name'
                    name='name'
                    type='text'
                    value={formik.values.name}
                    onChange={(e)=>{handleChange(e.target.value)}}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.touched.name &&
                    formik.errors.name
                }
            </form>
            <button
                onClick={() => previousStep()}>
                Previous ⏮️
            </button>
            <button
                form="step2_form"
                type="submit"
                onClick={formik.handleSubmit}
            >
                Next ⏭
            </button>
        </>
    );
};