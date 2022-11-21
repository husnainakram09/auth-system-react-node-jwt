import * as React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { HiOutlineHome, HiOutlineChevronLeft } from "react-icons/hi";
import { FieldsForm } from '../';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface PropsType {
    section: any
    pageDesc: string
    pageTitle: string
}

const Main: React.FC<PropsType> = ({ section, pageDesc, pageTitle }) => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const { colors, items, layoutId } = section
    const { description, title, button1 } = items
    const { action } = button1
    const { steps } = action

    const handleNextStep = (step: number, type: string | null) => {
        if (type == null) {
            setCurrentStep(step)
        }
        else {
            const data = {
                name: 'some',
                email: 'email@some.com'
            }
            setCurrentStep(step)
            // axios.post(`${process.env.REACT_APP_API_URL}/user/store-user`, data).then(res => {
            //     console.log(res.data)
            // })
        }
    }

    function SectionNav({ showBack }: any) {
        return (
            <div className='d-flex align-items-center mb-3'>
                <HiOutlineHome onClick={() => handleNextStep(0, null)} size={25} style={{ marginRight: 10, cursor: 'pointer' }} />
                {
                    showBack &&
                    <span style={{ cursor: 'pointer' }} onClick={() => handleNextStep(currentStep - 1, null)}>
                        <HiOutlineChevronLeft size={25} />
                    </span>
                }
                <strong>Dashboard</strong>
            </div>
        )
    }

    switch (currentStep) {

        case 0:
            return (
                <>
                    <h4 className="mb-4">{pageTitle}</h4>
                    {
                        pageDesc != "" &&
                        <p>{pageDesc}</p>
                    }
                    <div id={layoutId} style={{ padding: 10, borderRadius: 10, backgroundColor: colors.backgroundColor }}>
                        <h6>{title}</h6>
                        <p>{description}</p>
                        <div className="d-flex justify-content-end">
                            <button onClick={() => handleNextStep(1, null)} className="btn btn-success" type={button1.type}>{items.button1.title}</button>
                        </div>
                    </div>
                </>
            )
            break;

        default:
            {

                const { title, description, nextButton, footer, items } = steps[currentStep - 1]
                console.log(items)
                return (
                    <>
                        <SectionNav showBack={nextButton != null} />
                        <h6 className="m-0">{title}</h6>
                        <p>{description}</p>
                        <div id={layoutId} style={{ padding: 10, borderRadius: 10, backgroundColor: colors.backgroundColor }}>
                            {

                                items.map((item: any, index: any) => {
                                    return (
                                        item.type == 'form' ?
                                            <>
                                                {
                                                    item.form.groups.map((group: any, index: any) => {
                                                        const { fields } = group
                                                        const initialValues: any = {}
                                                        fields.forEach((field: any) => {
                                                            field.type == "5" ?
                                                                field.calculated ?
                                                                    initialValues[field.name] = 0
                                                                    :
                                                                    initialValues[field.name] = ""
                                                                :
                                                                initialValues[field.name] = ""
                                                        })

                                                        return (
                                                            <Formik
                                                                key={index}
                                                                initialValues={initialValues}
                                                                onSubmit={(values, actions) => {
                                                                    console.log({ values, actions });
                                                                    alert(JSON.stringify(initialValues, null, 2));
                                                                    actions.setSubmitting(false);
                                                                    handleNextStep(currentStep + 1, nextButton.action.type)
                                                                }}
                                                            >
                                                                {({ errors, touched, isValidating }) => (
                                                                    <Form>
                                                                        {
                                                                            fields.map((field: any, index: any) => (
                                                                                <FieldsForm fields={field} />
                                                                            ))
                                                                        }
                                                                        <div className="d-flex justify-content-end">
                                                                            <button className="btn btn-success" type='submit'>{nextButton.title}</button>
                                                                        </div>
                                                                    </Form>
                                                                )}
                                                            </Formik>
                                                        )
                                                    })
                                                }
                                            </>
                                            :
                                            <>
                                                <h1>hello</h1>
                                            </>
                                    )
                                })
                            }
                        </div>
                        {
                            footer != null &&
                            <div className='mt-4 mb-5' dangerouslySetInnerHTML={{ __html: footer }} />
                        }
                    </>
                )
            }
            break;
    }

}

export default Main