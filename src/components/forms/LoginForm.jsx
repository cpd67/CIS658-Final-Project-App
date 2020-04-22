import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from '../main/ErrorMessage';
import API from '../main/API';

/**
 * Display a form for allowing Users to log into their account.
 */
export const LoginForm = props => {
    const { onSubmit } = props;
    const [submitErrors, setSubmitErrors] = React.useState("");
    const history = useHistory();
    const initialValues = {username: "", password: ""}

    return (
        <>
            <ErrorMessage message={submitErrors} />
            <h1>Log in</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, formikHelpers) => {
                    API.loginUser(values).then(data => {
                        if(!data.errors) {
                            onSubmit(data.user);
                            history.push("/");
                        } else {
                            setSubmitErrors(Object.values(data.errors));
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
                                <Field type="text" name="username" id="username" className="form-control" required/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor={"password"}>Password</label>
                                <Field type="password" name="password" id="password" className="form-control" required/>
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