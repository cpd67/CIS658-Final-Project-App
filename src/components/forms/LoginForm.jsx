import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import API from '../main/API';

export const LoginForm = props => {
    const { onSubmit } = props;
    const history = useHistory();
    const initialValues = {username: "", password: ""}

    return (
        <>
            <h1>Log in</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, formikHelpers) => {
                    API.loginUser(values).then(data => {
                        if(data.errors) {
                            console.log(data.errors);
                        } else {
                            onSubmit(data.user);
                            history.push("/");
                        }
                    });
                    formikHelpers.setSubmitting(false);
                }}
            >
                <Form>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor={"username"}>Username</label>
                                <Field type="text" name="username" className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor={"password"}>Password</label>
                                <Field type="password" name="password" className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    );
}