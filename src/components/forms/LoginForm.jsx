import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import { apiUrl } from '../main/utils';

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
                    let redirect = false;
                    fetch(`${apiUrl}/login`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        credentials: 'include',
                        body: JSON.stringify(values)
                    }).then(res => res.json()
                    ).then(data => {
                        if(data.errors) {
                            console.log(data.errors);
                        } else {
                            onSubmit(data.user);
                            redirect = true;
                        }
                    });
                    formikHelpers.setSubmitting(false);
                    if(redirect) {
                        history.push("/");
                    }
                }}
            >
                <Form>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor={"username"}>Username</label>
                                <Field type="text" name="username" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor={"password"}>Password</label>
                                <Field type="password" name="password" className="form-control" />
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