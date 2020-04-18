import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';

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
        <Formik initialValues={initialValues}
                onSubmit={(values, formikHelpers) => {}}
        >
            <Form>
                <div className="row">
                    <div className="col-md-7">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field type="text" name="firstName" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field type="text" name="lastName" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field type="text" name="username" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            <label htmlFor="passwordConfirmation">Confirm password</label>
                            <Field type="password" name="passwordConfirmation" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <button type="submit" className="btn btn-primary">Sign up!</button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}