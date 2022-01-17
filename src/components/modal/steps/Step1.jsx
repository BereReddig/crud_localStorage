import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWizard } from 'react-use-wizard';
// utils
import utilsSS from '../../../utils/utilsSS';
// context
import UserContext from '../../../contexts/Users.context';

export default function Step1() {
    const context = useContext(UserContext);
    //console.log('context: ', context)

    //console.log(context)
    const { nextStep } = useWizard();

    const usernameSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, 'Too Short!')
            .max(50, "Are you really sure that your username is that big?")
            .required('Required'),
    });

    let iValue;
    if (utilsSS.getItem('newUser')) {
        iValue = {
            username: utilsSS.getItem('newUser').username
        }
    } else if (context.editUser !== "") {
        iValue = {
            username: context.editUser.username
        }
    } else {
        iValue = {
            username: ''
        }
    };

    const formik = useFormik({
        initialValues: iValue,
        validationSchema: usernameSchema,
        onSubmit: values => {
            const { username } = values;

            if (utilsSS.getItem('newUser') === null) {
                utilsSS.setItem('newUser', { username });
            } else {
                let userData = utilsSS.getItem('newUser');
                let newData = { ...userData, username }
                utilsSS.setItem('newUser', newData);
            };

            nextStep();
        }
    });

    const handleChange = (value) => {
        formik.setFieldValue('username', value);
    };

    return (
        <>
            <form id='step1_form'>
                <label htmlFor='username'>
                    Username
                </label>
                <input
                    id='username'
                    name='username'
                    type='text'
                    value={formik.values.username}
                    onChange={(e) => { handleChange(e.target.value) }}
                    onBlur={formik.handleBlur}
                />
                {
                    formik.touched.username &&
                    formik.errors.username
                }
            </form>
            <button
                form="step1_form"
                type="submit"
                onClick={formik.handleSubmit}
            >
                Next ⏭
            </button>
        </>
    );
};