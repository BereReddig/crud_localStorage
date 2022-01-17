import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWizard } from 'react-use-wizard';
// utils
import utilsSS from '../../../utils/utilsSS';
// context
import UserContext from '../../../contexts/Users.context';

export default function Step4({ onClose }) {
    const context = useContext(UserContext);
    console.log('context ', context)
    console.log('newUser ', utilsSS.getItem('newUser'))

    let photoInput = React.createRef();
    console.log('photoInput ', photoInput)

    const { previousStep } = useWizard();

    const photoSchema = Yup.object().shape({
        iPhoto: Yup.string()
            .required("You need to provide a file")
            .test("type", "Only the following formats are accepted: .jpeg, .jpg, .png",
                (value) => {
                    return (
                        //console.log('value photoSchema ', value)
                        value.includes('.jpg') ||
                        value.includes('.jpeg') ||
                        value.includes('.png')
                    )
                }
            )
    });

    // let iValue;
    // if (context.editUser !== "") {
    //     iValue = {
    //         iPhoto: context.editUser.photoName
    //     }
    // } else {
    //     iValue = {
    //         iPhoto: {}
    //     }
    // };
    //console.log('iValue ', iValue)
    const formik = useFormik({
        initialValues: {},
        validationSchema: photoSchema,
        onSubmit: value => {
            //console.log('photoInput.current ', photoInput.current.files[0])
            if (context.editUser === "" && photoInput.current !== null) {
                let newUser = utilsSS.getItem('newUser');
                let photoName = photoInput.current.files[0].name;

                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    context.addUser({ ...newUser, photo: reader.result, photoName })
                    sessionStorage.clear();
                    onClose();
                });
                reader.readAsDataURL(photoInput.current.files[0]);
            } else {
                let updateData = utilsSS.getItem('newUser');
                let photoName = photoInput.current.files[0].name;
                let userId = context.editUser.id;

                const reader = new FileReader();

                reader.addEventListener('load', () => {
                    const newData = {...updateData, photo: reader.result, photoName};
                    console.log('newData ', newData)
                    context.updateUser(userId, newData)
                    sessionStorage.clear();
                    onClose();
                });
                reader.readAsDataURL(photoInput.current.files[0]);

                //console.log('newUser ', newUser)
                //console.log('photoName ', photoName)
                //context.updateUser(userId, updateData)
            }
            // let photoName;
            // if (photoInput.current === null) {
            //     console.log('entro al if onSubmit  ')
            //     photoName = context.editUser.photoName;
            //     let photo = context.editUser.name;
            //     let newUser = utilsSS.getItem('newUser');

            //     addUser({ ...newUser, photo, photoName })
            //     sessionStorage.clear();
            //     onClose();
            // } else {
            //     console.log('entro al else onSubmit  ')
            //     let newUser = utilsSS.getItem('newUser');
            //     photoName = photoInput.current.files[0].name;
            //     //console.log('value ', value)
            //     //console.log('photoInput.name ', photoInput.current.files[0])

            //     const reader = new FileReader();

            //     reader.addEventListener('load', () => {
            //         console.log(reader.result);
            //         addUser({ ...newUser, photo: reader.result, photoName })
            //         sessionStorage.clear();
            //         onClose();
            //     });
            //     reader.readAsDataURL(photoInput.current.files[0]);
            // }
        },
    });

    const handleChange = (value) => {
        formik.setFieldValue('iPhoto', value);
    };

    return (
        <>
            <form id='step4_form'>
                <label htmlFor='iPhoto'>
                    Photo
                </label>
                <input
                    id='iPhoto'
                    name='iPhoto'
                    type='file'
                    accept=".jpg, .jpeg, .png"
                    value={formik.values.iPhoto}
                    onChange={(e) => { handleChange(e.target.value) }}
                    onBlur={formik.handleBlur}
                    ref={photoInput}
                />
                {
                    formik.touched.iPhoto &&
                    formik.errors.iPhoto
                }
            </form>
            <button
                onClick={() => previousStep()}>
                Previous ⏮️
            </button>
            <button
                form="step4_form"
                type="submit"
                onClick={formik.handleSubmit}
            >
                Submit
            </button>
        </>
    );
};