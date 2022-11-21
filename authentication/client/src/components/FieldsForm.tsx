import * as React from 'react'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    useFormikContext
} from 'formik';

interface PropsType {
    fields: any
}


const FieldsForm: React.FC<PropsType> = ({ fields }) => {

    const FIELDTYPES: any = {
        0: 'label',
        1: 'text',
        2: 'checkbox',
        3: 'list',
        4: 'date',
        5: 'number',
        6: 'currency'
    }

    const { values, submitForm }: any = useFormikContext();
    return (
        <>
            <div className='mb-3 w-50'>
                {
                    (fields.type != "2" && !fields?.hidden) &&
                    <label htmlFor={fields.name}>{fields.title}</label>
                }
                {
                    fields.type == "5" ?
                        fields.calculated ?
                            <Field required={fields?.required} hidden={fields?.hidden} className="form-control" type={FIELDTYPES[fields.type]} value={values.monthlySalary * 12} id={fields.name} name={fields.name} placeholder={fields.placeholder} />
                            :
                            <Field required={fields?.required} hidden={fields?.hidden} className="form-control" type={FIELDTYPES[fields.type]} id={fields.name} name={fields.name} placeholder={fields.placeholder} />
                        :
                        fields.type == "4" ?
                            <>
                                <Field max={"2000-13-13"} required={fields?.required} hidden={fields?.hidden} className="form-control" type={FIELDTYPES[fields.type]} id={fields.name} name={fields.name} placeholder={fields.placeholder} />
                            </>
                            :
                            fields.type == "3" ?
                                <>
                                    <Field required={fields?.required} hidden={fields?.hidden} className="form-select" as="select" id={fields.name} name={fields.name} placeholder={fields.placeholder}>
                                        {
                                            fields.values.map((option: any) => (
                                                <option value={option.key}>{option.value}</option>
                                            ))
                                        }
                                    </Field>
                                </>
                                :
                                <>
                                    <Field required={fields?.required} hidden={fields?.hidden} className={fields.type == "2" ? "form-check-input" : "form-control"} type={FIELDTYPES[fields.type]} id={fields.name} name={fields.name} placeholder={fields.placeholder} />

                                    {
                                        (fields.type == "2" && !fields?.hidden) &&
                                        <label style={{ marginLeft: '10px' }} htmlFor={fields.name}>{fields.title}</label>
                                    }
                                </>
                }
            </div>
        </>
    )
}

export default FieldsForm