import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '../main/ErrorMessage';
import API from '../main/API';

/**
 * Display a form for allowing Users to sign up and create accounts.
 */
export const SignupForm = props => {
    const { onSubmit } = props;
    const [submitErrors, setSubmitErrors] = React.useState("");
    const history = useHistory();

    const initialValues = {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    }

    return (
        <>
            <ErrorMessage message={submitErrors} />
            <h1>Sign up</h1>
            <Formik initialValues={initialValues}
                    onSubmit={(values, formikHelpers) => {
                        API.signupUser(values).then(data => {
                            if(!data.errors || data.errors.length === 0) {
                                onSubmit(data.user);
                                history.push("/");
                            } else {
                                setSubmitErrors(Object.values(data.errors));
                            }
                        });
                        formikHelpers.setSubmitting(false);
                    }}
                    validate={(values, props) => {
                        const errors = {};
                        // Ensure passwords match
                        if(values.password !== values.passwordConfirmation) {
                            errors.passwordConfirmation = 'Passwords must match';
                        }

                        return errors;
                    }}
            >
                { ({ errors, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field type="text" name="first_name" id="firstName" className="form-control" required/>
                                    {errors.firstName && touched.firstName && <div className="text-danger">{errors.firstName}</div>}
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field type="text" name="last_name" id="lastName" className="form-control" required/>
                                    {errors.lastName && touched.lastName && <div className="text-danger">{errors.lastName}</div>}
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field type="text" name="username" id="username" className="form-control" required/>
                                    {errors.username && touched.username && <div className="text-danger">{errors.username}</div>}
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" id="password" className="form-control" required/>
                                    {errors.password && touched.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-group">
                                    <label htmlFor="passwordConfirmation">Confirm password</label>
                                    <Field type="password" name="passwordConfirmation" id="confirmPassword" className="form-control" required/>
                                    {errors.passwordConfirmation && touched.passwordConfirmation && <div className="text-danger">{errors.passwordConfirmation}</div>}
                                </div>
                            </div>
                            <div className="col-md-7">
                                <button type="submit" className="btn btn-primary">Sign up!</button>
                            </div>
                        </div>
                   </Form>
                   )
                }
           </Formik>
        </>
    );
}