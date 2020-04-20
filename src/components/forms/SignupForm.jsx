import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import API from '../main/API';

export const SignupForm = props => {
    const { onSubmit } = props;
    const history = useHistory();

    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    }

    return (
        <>
            <h1>Sign up</h1>
            <Formik initialValues={initialValues}
                    onSubmit={(values, formikHelpers) => {
                        API.signupUser(values).then(data => {
                            if(data.user) {
                                onSubmit(data.user);
                                history.push("/");
                            } else {
                                console.error("Somthing went wrong!");
                                console.error(data);
                            }
                        });
                        formikHelpers.setSubmitting(false);
                    }}
            >
                <Form>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Field type="text" name="firstName" className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Field type="text" name="lastName" className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field type="text" name="username" className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password" name="password" className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor="passwordConfirmation">Confirm password</label>
                                <Field type="password" name="passwordConfirmation" className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <button type="submit" className="btn btn-primary">Sign up!</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
}